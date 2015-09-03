/**
 * @file
 * JS code for the westminster_schedule feature.
 */

if (top != self) {
  top.location.replace(self.location.href);
}

jQuery(document).ready(function() {

  var $ = jQuery;
  var DEFAULT_VIEW = "month";

  (function($) {
    $.each(['show', 'hide'], function(i, ev) {
      var el = $.fn[ev];
      $.fn[ev] = function() {
        this.trigger(ev);
        return el.apply(this, arguments);
      };
    });
  })(jQuery);

  var cView, cYear, cMonth, cDate, cDisplay, init;
  cView = DEFAULT_VIEW;
  var token;

  getToken();
  addModalListeners();

  var $modalTemplate = $('#modalTemplate').detach();
  $modalTemplate.clone(true).attr('id','activeModal').appendTo('body');

  function addModalListeners(){

    $('#modalTemplate').on('hide', function() {
      $('#calendar').fullCalendar('refetchEvents');
      $('#activeModal').remove();
      if ($modalTemplate) {
        $modalTemplate.clone(true).attr('id','activeModal').appendTo('body');
      }
    });

    $('#repeat-checkbox').prop('checked', false).on('click', function() {
      if (this.checked) {
        $('#repeat-content').removeClass('hidden');
      }
      else {
        $('#repeat-content').addClass('hidden');
      }
    });
    $('input.repeat-option').on('click', function() {
      $('div.repeat-option:not(#' + this.value.toLowerCase() + '-repeat-options)').addClass('hidden');
      $('#' + this.value.toLowerCase() + '-repeat-options').removeClass('hidden');
    });
    $('.clockpicker').on('keyup input', function() {
      // Console.log('test');
      // Change clockpicker here on input to reflect manually typed time on click immediately.
    })
    $('.num-input').on("keypress", function(e) {
      // Allow 1-9, no + or - characters.
      return posNumOnly(e, this);
    })
    $('.num-input').bind('keyup input', function(e) {
      if (this.value == 0) {
        this.value = 1;
      }
      else if (this.value[0] == "0") {
        // Check for leading zeros and remove them.
        var numZero = 0;
        for (var i = 0; i < this.value.length; i++) {
          if (this.value[i] == "0") {
            numZero++;
          }
          else {
            break;
          }
        }
        this.value = this.value.substring(numZero);
      }
      togglePlural(parseInt(this.value) != 1, $('#' + $(this).attr('id') + '-text'));
    });

    $('#scenario-schedule #scenario-dropdown').change(function() {
      if ($('#scenario-schedule #scenario-dropdown')[0].value == "_none") {
        $('#scenario-schedule #event-title')[0].value = "";
      }
      else {
        $('#scenario-schedule #event-title')[0].value = $('#scenario-schedule #scenario-dropdown option:selected').text();
      }
    });

    $('#scenario-schedule #edit-submit').on('click', function() {
      var formData = gatherFormData();
      if (formData != false) {
        // Do stuff with cms here.
        if ($('#scenario-schedule').data('nid')) {
          updateExistingEvent(formData, $('#scenario-schedule').data('nid'));
        }
        else {
          addEvent(formData);
        }
      }
    });
    $('#scenario-schedule #edit-remove').on('click', function() {
      deleteEvent($('#scenario-schedule').data('nid'));
    });
  }

  function posNumOnly(e, that) {
    switch (e.keyCode) {
      case 48:
        return that.value.length == 0 ? false : true;

      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
        return true;

      default:
        return false;

    }
  }

  function togglePlural(plural, $text) {
    var text = $text.text();
    if (!plural) {
      // Check for s to remove.
      if (text[text.length - 1] == "s") {
        // Ends in s, remove the s.
        $text.text(text.substring(0, text.length - 1));
      }
    }
    else {
      if (text[text.length - 1] != "s") {
        $text.text(text + "s");
      }
    }
  }

  // Get previous has if it exists - used to redirect back from the modal state to previous calendar view.
  if (sessionStorage.getItem("hash")) {
    // Get previous hash tag if exists.
    window.location.hash = sessionStorage.getItem("hash");
  }
  setView();

  function setView() {
    var display_id = window.location.pathname.slice(window.location.pathname.lastIndexOf('/') + 1);
    if (window.location.hash) {
      var x = window.location.hash.slice(1).split('/');
      cView = x[0] ? x[0] : DEFAULT_VIEW;
      cYear = x[1];
      cMonth = x[2];
      cDate = x[3];
      cDisplay = display_id;
    }
  }
  $('#calendar').fullCalendar({
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    },
    events: BASEPATH + 'events/json?id=' + DISPLAY_ID,
    defaultView: cView,
    editable: true,
    selectable: true,
    selectHelper: true,
    overlap: false,
    select: function(start, end, allDay, event, view) {
      createEvent(start, end, allDay, cDisplay);
    },
    viewRender: function(view, element) {
      // GetEvents(view.visStart, view.visEnd, cDisplay);
      var name = view.name == DEFAULT_VIEW ? '' : view.name;
      var d = $('#calendar').fullCalendar('getDate');
      window.location.hash = name + '/' + d.getFullYear() + '/' + d.getMonth() + '/' + d.getDate();
      if (!init) {
        $(window).on('hashchange', function() {
          setView();
          var v = $('#calendar').fullCalendar('getView');
          if (v.name != cView){
            $('#calendar').fullCalendar('changeView', cView);
          }
          $('#calendar').fullCalendar('gotoDate', cYear, cMonth, cDate);
          // Store hash tag for refresh.
          sessionStorage.setItem("hash", window.location.hash);
        });
        init = true;
      }
    },
    eventClick: function(event, jsEvent, view) {
      // Do this since date is included in time, need to remove date.
      var sTime = event.start.toTimeString().split(" ")[0];
      var eTime = event.end.toTimeString().split(" ")[0];
      showModal({
        "sDate": event.start,
        "sTime": sTime,
        "eDate": event.end,
        "eTime": eTime,
        "displayId": event.display,
        "title": event.title,
        "scenarioNid": event.scenarioNid,
        "rrule": event.rrule,
        "nid": event.id
      });
    },
    eventDrop: function(event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view) {
      updateEvent(event);
    },
    eventResize: function(event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view) {
      updateEvent(event);
    },
    eventRender: function(event, element) {
      // Note that any additional pieces of DOM can be inserted here, like these elements below.
      // Event.properties must be set in getEvents, and may be styled with schedule.css.
      $(element).data('start', event.starttime);
      $(element).data('end', event.endtime);
    }
  });

  function showModal(eventObj) {
    // Big change here.
    // Have to pull in data from eventObj and populate fields of modal with the data.
    var HEADER_HEIGHT = 48;

    var $c = $('#activeModal');
    var $schedule = $('#scenario-schedule');

    if (eventObj.nid) {
      $schedule.data('nid', eventObj.nid);
      $('#edit-remove').removeClass('hidden');
    }

    $('.clockpicker').clockpicker({
      twelvehour: true,
      autoclose: true,
      minutestep: 5
    });
    $('.datepicker').datepicker({
      dateFormat: "yy-mm-dd",
      changeMonth: true,
      changeYear: true
    });
    // Populate modal with incoming data.
    var sDate = eventObj.sDate;
    var sTime = eventObj.sTime;
    var eDate = eventObj.eDate;
    var eTime = eventObj.eTime;
    var displayId = eventObj.displayId;
    var title = eventObj.title;
    var rrule = eventObj.rrule ? RRule.parseString(eventObj.rrule.replace("RRULE:", "")) : false;

    var scenarioNid = eventObj.scenarioNid;
    // Convert dates to date string excepted by date input time.
    // Same with times.
    $schedule.find('#sDate')[0].value = new Date(sDate).toISOString().split('T')[0];
    $schedule.find('#sTime')[0].value = stringToTime(sTime);
    $schedule.find('#eDate')[0].value = new Date(eDate).toISOString().split('T')[0];
    $schedule.find('#eTime')[0].value = stringToTime(eTime);
    $schedule.find('#displayId')[0].value = displayId;
    $schedule.find('#event-title')[0].value = title ? title : "";
    if (rrule) {
      // Node repeats.
      $schedule.find('#repeat-checkbox').trigger('click');
      switch (rrule.freq) {
        case RRule.DAILY:
          $('#rdaily').trigger('click');
          // We have a few possibilities.
          // Variables to check: count OR until, interval, byweekday.
          // If no byweekday, then it repeats every interval days.
          if (!rrule.byweekday || !rrule.byweekday.length) {
            $('#daily-repeat-interval-option-1').trigger('click');
            $('#daily-repeat-interval-option-1-interval-child').val(rrule.interval);
          }
          else if (rrule.byweekday.length == 2) {
            // Every tu/th.
            $('#daily-repeat-interval-option-4').trigger('click');
          }
          else if (rrule.byweekday.length == 3) {
            $('#daily-repeat-interval-option-3').trigger('click');
          }
          else if (rrule.byweekday.length == 5) {
            $('#daily-repeat-interval-option-2').trigger('click');
          }
          break;

        case RRule.WEEKLY:
          $('#rweekly').trigger('click');
          $('#weekly-repeat-interval-option-1-interval').val(rrule.interval);
          if (rrule.byweekday && rrule.byweekday.length) {
            for (var i = 0; i < rrule.byweekday.length; i++) {
              switch (rrule.byweekday[i].weekday) {
                case 0:
                  // Monday.
                  $('#wrmon').prop('checked', true);
                  break;

                case 1:
                  // Tuesday.
                  $('#wrtue').prop('checked', true);
                  break;

                case 2:
                  // Wednesday.
                  $('#wrwed').prop('checked', true);
                  break;

                case 3:
                  // Thursday.
                  $('#wrthu').prop('checked', true);
                  break;

                case 4:
                  // Friday.
                  $('#wrfri').prop('checked', true);
                  break;

                case 5:
                  // Saturday.
                  $('#wrsat').prop('checked', true);
                  break;

                case 6:
                  // Sunday.
                  $('#wrsun').prop('checked', true);
                  break;

              }
            }
          }
          break;

          /*MONTHLY FEATURES case RRule.MONTHLY:
            break;*/
          /*YEARLY FEATUREScase RRule.YEARLY:
            break;*/
      }
      // Set either count or until.
      if (rrule.count) {
        var count = rrule.count;
        $('#stopAfter').trigger('click');
        $('#num-occurrence').val(rrule.count);
      }
      else {
        $('#stopon').trigger('click');
        $('#repeatStopDate').val(new Date(rrule.until).toISOString().split('T')[0]);
      }
    }

    $c.addClass('loading').modal({
      show: true
    });
    $scenarioDropdown = $('#scenario-schedule #scenario-dropdown');
    $.getJSON(BASEPATH + "rest/views/scenarios", function(data) {
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var $item = $('<option data-nid="' + item.nid + '" value="' + item.title.toLowerCase().replace(/ /g, '_') + '">' + item.title + '</option>');
        if (parseInt(scenarioNid) == parseInt(item.nid)) {
          $item.prop('selected',true);
        }
        $scenarioDropdown.append($item);
      }
      $('#activeModal').removeClass('loading');
    });
  }

  function stringToTime(s) {
    // Separate time into array [HH, mmam] or [HH, mmpm].
    var twelveHour = false;
    if (s.toLowerCase().indexOf("am") >= 0 || s.toLowerCase().indexOf("pm") >= 0) {
      twelveHour = true;
    }
    var timeArray = s.split(":");
    // Get string of hours.
    var hours = timeArray[0];
    // Get string of minutes.
    var minutes = timeArray[1].substring(0, 2);
    if (twelveHour) {
      // Get string of am/pm.
      var amPm = timeArray[1].substring(2);
      // Get hours number - won't need minutes number since we won't need to manipulate minutes.
      hours = parseInt(hours) ? parseInt(hours) : 0;
      // However we have to check if am or pm and convert hours to 24 hr format.
      if (hours == 12 && amPm.toUpperCase() == "AM") {
        // Set hours to 00.
        hours = "00";
      }
      else if (hours != 12 && amPm.toUpperCase() == "PM") {
        hours += 12;
      }
    }
    if (hours < 10 && ("" + hours).length == 1) {
      hours = "0" + hours;
    }
    if ((minutes + "").length == 1) {
      minutes = "0" + minutes;
    }
    // Returns time in 24-hour format.
    return hours + ":" + minutes;
  }

  function updateEvent(event) {
    var startDate = convertDateToCmsDate(event.start);
    var endDate = convertDateToCmsDate(event.end);
    var startTime = convertDateToCmsTime(event.start);
    var endTime = convertDateToCmsTime(event.end);
    var nid = event.id;
    var data = "field_date[und][0][value][date]=" + startDate + "&field_date[und][0][value][time]=" + startTime +
      "&field_date[und][0][value2][date]=" + endDate + "&field_date[und][0][value2][time]=" + endTime;
    $.ajax({
      type: "PUT",
      url: BASEPATH + "rest/node/" + nid,
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', getToken());
      },
      data: data,
      dataType: "json",
      success: function(data) {},
      error: function(data) {
        alert("Encountered an error while trying to save:\n" + data.status + ": " + data.statusText);
      }
    });
  }

  function updateExistingEvent(formData, nid) {
    var l = Ladda.create($('#edit-submit')[0]);
    l.start();
    $.ajax({
      type: "PUT",
      url: BASEPATH + "rest/node/" + nid,
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', getToken());
      },
      data: formData,
      dataType: "json",
      success: function(data){
        $('#activeModal').modal('hide');
      },
      error: function(data) {
        alert("Encountered an error while trying to save:\n" + data.status + ": " + data.statusText);
      }
    }).always(function() {
      l.stop();
    });
  }

  function deleteEvent(nid) {
    var l = Ladda.create($('#edit-remove')[0]);
    l.start();
    $.ajax({
      type: "DELETE",
      url: BASEPATH + "rest/node/" + nid,
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', getToken());
      },
      dataType: "json",
      nid: nid,
      success: function(data){
        $('#activeModal').modal('hide');
      },
      error: function(data) {
        alert("Encountered an error while trying to save:\n" + data.status + ": " + data.statusText);
      }
    }).always(function() {
      l.stop();
    });
  }

  function addEvent(formData) {
    var l = Ladda.create($('#edit-submit')[0]);
    l.start();
    $.ajax({
      type: "POST",
      url: BASEPATH + "rest/node.json",
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', getToken());
      },
      data: formData,
      dataType: "json",
      success: function(data) {
        $('#activeModal').modal('hide');
      },
      error: function(data) {
        alert("Encountered an error while trying to save:\n" + data.status + ": " + data.statusText);
      }
    }).always(function() {
      l.stop();
    });
  }

  function createEvent(start, end, allDay, displayId) {
    if (!end) {
      end = start;
    }
    var sDate = convertDateToCmsDate(start);
    var sTime = convertDateToCmsTime(start);

    if (allDay) {
      // When dragging, if all day, set to beginning of day after last dragged day (midnight)
      end.setDate(end.getDate() + 1);
      end.setHours(0);
      end.setMinutes(0);
    }

    var eDate = convertDateToCmsDate(end);
    var eTime = convertDateToCmsTime(end);
    createScheduledContent(sDate, sTime, eDate, eTime, displayId);

  }

  function createScheduledContent(sDate, sTime, eDate, eTime, displayId) {
    var data = "type=scheduled_content&date[value][date]=" + sDate +
      "&date[value][time]=" + sTime +
      "&date[value2][date]=" + eDate +
      "&date[value2][time]=" + eTime +
      "&field_display=" + displayId +
      "&embed=true";
    showModal({
      "sDate": sDate,
      "sTime": sTime,
      "eDate": eDate,
      "eTime": eTime,
      "displayId": displayId
    });
  }

  function pad(str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
  }

  function convertDateToCmsDate(date) {
    var month = (date.getMonth() + 1).toString();
    month = '0' + month;
    month = month.slice(-2);
    var day = date.getDate().toString();
    day = '0' + day;
    day = day.slice(-2);
    return month + "/" + day + "/" + date.getFullYear();
  }

  function convertDateToCmsTime(date) {
    var h = date.getHours();
    var dd = "am";
    if (h >= 12) {
      h = h - 12;
      dd = "pm";
    }
    if (h == 0) {
      h = 12;
    }
    m = date.getMinutes().toString();
    m = m.slice(-2);
    m = m.length == 1 ? '0' + m : m;
    return h + ":" + m + dd;
  }

  function convertStringToCmsTime(s) {
    // Always receives time in 24-hour formData.
    // Cms wants twelvehour - hh:mmam or hh:mmpm.
    var timeSplit = s.split(':');
    var hours = timeSplit[0];
    var minutes = timeSplit[1];
    // Default - return midnight.
    if (!hours || !minutes) {
      return '12:00am';
    }
    var ampm = "am";
    if (parseInt(hours) < 12) {
      if (hours == "00") {
        hours = "12";
      }
    }
    else {
      ampm = "pm";
      if (hours != "12") {
        hours = parseInt(hours) - 12;
        if (hours < 10) {
          hours = "0" + hours;
        }
      }
    }
    return hours + ":" + minutes + ampm;
  }
  function convertStringToCmsDate(s){
    // Receives date in yyyy-mm-dd format.
    // Cms wants mm/dd/yyyy.
    var splitDate = s.split('-');
    var month = splitDate[1];
    var day = splitDate[2];
    var year = splitDate[0];
    return month + '/' + day + '/' + year;
  }

  function gatherFormData() {
    var $form = $('#scenario-schedule');
    var error = [];
    // Title.
    var title = $form.find('#event-title')[0].value;
    if (!title || !title.length) {
      // Title is required.
      error.push("Content is required");
      $('#scenario-dropdown').focus();
    }
    else {
      $('#scenario-dropdown').siblings().find('.required-text').text("");
    }
    // DisplayId.
    var displayId = $form.find('#displayId')[0].value;
    if (!displayId || !displayId.length) {
      error.push("Display is required");
      $('#scenario-dropdown').focus();
    }
    else {
      $('#scenario-dropdown').siblings().find('.required-text').text("");
    }
    // StartDate.
    var sDate = $form.find('#sDate')[0].value;
    if (!sDate || !sDate.length) {
      if (!error.length) {
        $('#sDate').focus();
      }
      error.push("Start date is required.");
    }
    else {
      $('#sDate').siblings().find('.required-text').text("");
    }
    // StartTime.
    var sTime = $form.find('#sTime')[0].value;
    if (!sTime || !sTime.length) {
      if (!error.length) {
        $('#sTime').focus();
      }
      error.push("Start time is required");
    }
    else {
      $('#sTime').siblings().find('.required-text').text("");
    }
    // EndDate.
    var eDate = $form.find('#eDate')[0].value;
    if (!eDate || !eDate.length) {
      if (error.length) {
        $('#eDate').focus();
      }
      error.push("End date is required");
    }
    else {
      $('#eDate').siblings().find('.required-text').text("");
    }
    // EndTime.
    var eTime = $form.find('#eTime')[0].value;
    if (!eTime || !eTime.length) {
      if (error.length) {
        $('#eTime').focus();
      }
      error.push("End time is required");
    }
    else {
      $('#eTime').siblings().find('.required-text').text("");
    }
    // Repeats.
    var repeats = $form.find('#repeat-checkbox').prop('checked');
    // ScenarioNid.
    var scenarioNid = $form.find('#scenario-dropdown option:selected').data('nid');
    if (!scenarioNid || scenarioNid == "") {
      // Title is required.
      $('#scenario-dropdown').focus();
      if (!error.length) {
        error.push('Content is requred');
      }
    }
    else {
      $('#scenario-dropdown').siblings().find('.required-text').text("");
    }
    var repeatsObject = null;
    if (repeats) {
      var frequency = $form.find('input[name=repeats]:checked').val();
      switch (frequency) {
        case "DAILY":
          // Daily repeat items.
          var daily_byday_radios = $form.find('input[name=daily-interval]:checked').val();
          var daily_interval_child = $form.find('#daily-repeat-interval-option-1-interval-child').val();
          repeatsObject = {
            "FREQ": frequency,
            "daily": {
              "byday_radios": daily_byday_radios,
              "INTERVAL_child": daily_interval_child
            }
          };
          break;

        case "WEEKLY":
          // Weekly repeat items.
          var weekly_interval = $form.find('#weekly-repeat-interval-option-1-interval').val();
          var weekly_byday_all = $form.find('#weekly-repeat-options input.repeat-day:checked');
          var weekly_byday = {};
          weekly_byday_all.each(function() {
            weekly_byday[$(this).val()] = $(this).val();
          });
          repeatsObject = {
            "FREQ": frequency,
            "weekly": {
              "INTERVAL": weekly_interval,
              "BYDAY": weekly_byday
            }
          };
          break;

          /*MONTHLY FEATUREScase "MONTHLY":
            //Monthly repeat items
            var monthly_day_month = $form.find('input[name=monthly-repeat-interval-options]:checked').val();
            var monthly_bymonthday_bymonth_child_bymonthday = $form.find("#monthly-repeat-interval-option-1-dropdown option:selected").val();
            var monthly_bymonthday_bymonth_child_bymonth = {};
            var monthly_byday_bymonth_child_byday_count = $form.find('#monthly-repeat-interval-option-2-dropdown-1 option:selected').val();
            var monthly_byday_bymonth_child_byday_day = $form.find('#monthly-repeat-interval-option-2-dropdown-2 option:selected').val();
            var monthly_bymonthday_bymonth_child_bymonths_all = $form.find('#monthly-repeat-interval-option-1-month-choices .repeat-month:checked');
            var monthly_byday_bymonth_child_bymonth = {};
            var monthly_byday_bymonth_child_bymonths_all = $form.find('#monthly-repeat-interval-option-2-month-choices .repeat-month:checked');
            monthly_bymonthday_bymonth_child_bymonths_all.each(function() {
              monthly_bymonthday_bymonth_child_bymonth[$(this).val()] = $(this).val();
            });
            monthly_byday_bymonth_child_bymonths_all.each(function() {
              monthly_byday_bymonth_child_bymonth[$(this).val()] = $(this).val();
            });
            repeatsObject = {
              "FREQ": frequency,
              "monthly": {
                "day_month": monthly_day_month,
                "BYMONTHDAY_BYMONTH_child": {
                  "BYMONTHDAY": monthly_bymonthday_bymonth_child_bymonthday,
                  "BYMONTH": monthly_bymonthday_bymonth_child_bymonth
                },
                "BYDAY_BYMONTH_child": {
                  "BYDAY_COUNT": monthly_byday_bymonth_child_byday_count,
                  "BYDAY_DAY": monthly_byday_bymonth_child_byday_day,
                  "BYMONTH": monthly_byday_bymonth_child_bymonth
                }
              }
            }
            break;MONTHLY FEATURES*/
          /*YEARLY FEATURES
        case "YEARLY":
          //Yearly repeat items
          var yearly_interval = $form.find('#yearly-repeat-options #rnumber').val();
          var yearly_day_month = $form.find('input[name=yearly-repeat-interval-options]:checked').val();
          var yearly_bymonthday_bymonth_child_bymonthday = $form.find('#yearly-repeat-interval-option-1-dropdown option:selected').val();
          var yearly_bymonthday_bymonth_child_bymonth = {};
          var yearly_bymonthday_bymonth_child_bymonths_all = $form.find('#yearly-repeat-interval-option-1-month-choices input:checked');
          var yearly_byday_bymonth_child_byday_count = $form.find('#yearly-repeat-interval-option-2-dropdown-1 option:selected').val();
          var yearly_byday_bymonth_child_byday_day = $form.find('#yearly-repeat-interval-option-2-dropdown-2 option:selected').val();
          var yearly_byday_bymonth_child_bymonth = {};
          var yearly_byday_bymonth_child_bymonths_all = $form.find('#yearly-repeat-interval-option-2-month-choices input:checked');
          $.each(yearly_bymonthday_bymonth_child_bymonths_all, function() {
            yearly_bymonthday_bymonth_child_bymonth[$(this).val()] = $(this).val();
          });
          $.each(yearly_byday_bymonth_child_bymonths_all, function() {
            yearly_byday_bymonth_child_bymonth[$(this).val()] = $(this).val();
          });
          repeatsObject = {
            "FREQ": frequency,
            "yearly": {
              "INTERVAL": yearly_interval,
              "day_month": yearly_day_month,
              "BYMONTHDAY_BYMONTH_child": {
                "BYMONTHDAY": yearly_bymonthday_bymonth_child_bymonthday,
                "BYMONTH": yearly_bymonthday_bymonth_child_bymonth
              },
              "BYDAY_BYMONTH_child": {
                "BYDAY_COUNT": yearly_byday_bymonth_child_byday_count,
                "BYDAY_DAY": yearly_byday_bymonth_child_byday_day,
                "BYMONTH": yearly_byday_bymonth_child_bymonth
              }
            }
          }
          break;
          YEARLY FEATURES */
      }

      // Universal repeat items.
      var range_of_repeat = $form.find('input[name=stop-repeating]:checked').val();
      var count_child = $form.find('#num-occurrence').val();
      var until_child_datetime_date = $form.find('#repeatStopDate').val();
      // Var until_child_tz = ''; //?
      // Var until_child_all_day = ''; //?
      // Var until_child_granularity = ''; //?
      repeatsObject["range_of_repeat"] = range_of_repeat;
      if (range_of_repeat == "COUNT") {
        repeatsObject['count_child'] = count_child;
      }
      else if (range_of_repeat == "UNTIL") {
        if (!until_child_datetime_date) {
          if (!error.length) {
            $('#repeatStopDate').focus();
          }
          error.push("Stop date is required if using until field");
        }
        else {
          $('#repeatStopDate').siblings().find('.required-text').text("");
          repeatsObject['until_child'] = {
            'datetime': {
              'date': convertDateToCmsDate(new Date(until_child_datetime_date))
            }
          };
        }
      }
    }
    if (error.length) {
      for (var i = 0; i < error.length; i++) {
        alert(error[i]);
      }
      return false;
    }

    // Return Drupal form data.
    repeats = repeats ? "1" : "0";
    var newFormData = {
      "title": title,
      "type": "scheduled_content",
      "field_display_term": {
        "und": {
          displayId
        }
      },
      "field_date": {
        "und": [{
          "value": {
            "date": convertStringToCmsDate(sDate),
            "time": convertStringToCmsTime(sTime)
          },
          "value2": {
            "date": convertStringToCmsDate(eDate),
            "time": convertStringToCmsTime(eTime)
          },
          "show_repeat_settings": repeats,
          "rrule": repeatsObject
        }]
      },
      "field_content": {
        "und": scenarioNid
      }
    }
    return newFormData;
  }

  function getToken(refresh) {
    if (!token || refresh) {
      token = $.ajax({
        url: BASEPATH + 'services/session/token',
        dataType: 'text',
        async: false,
        error: function(data) {
          alert("Encountered an error while trying to save:\n" + data.status + ": " + data.statusText);
        }
      }).responseText;
    }
    return token;
  }
});
