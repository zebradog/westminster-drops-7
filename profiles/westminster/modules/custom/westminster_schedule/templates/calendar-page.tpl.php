<script type="text/javascript">
    var BASEPATH = "<?php echo base_path();?>";
    var DISPLAY_ID = "<?php echo arg(2); ?>"; 
</script>
<div id='calendar'></div>

<!-- Modal -->
<div class="modal fade" id="modalTemplate" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content" id="scenario-schedule" data-nid>
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Schedule Content</h4>
      </div>

        <form id="event-modal-form" class="modal-body form-horizontal">
          <input id="event-title" type="text" name="title" class="hidden"></input>
          <input id="displayId" type="text" name="display" class="hidden"></input>

          <div class="form-type-select form-item-field-content-und form-item form-group">
            <label for="scenario-dropdown" class="col-sm-2">Content<span class="required-text"></span></label>
            <div class="col-sm-10">
              <select class="form-control form-select required" id="scenario-dropdown" name="scenarios">
                <option class="default-select" value="_none">- Select a scenario -</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-2">From</label>
            <div class="col-sm-5">
              <input class="date-clear form-control form-text datepicker date-popup-init" type="date" id="sDate" name="start-date" size="20" maxlength="30"></input>
            </div>
            <div class="col-sm-5">
              <input class="date-clear form-control form-text clockpicker date-popup-init" type="time" id="sTime" name="start-time" size="15" maxlength="10"></input>
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-2">To</label>
            <div class="col-sm-5" title="">
              <input class="date-clear form-control form-text datepicker date-popup-init" type="date" id="eDate" name="end-date" size="20" maxlength="30"></input>
            </div>
            <div class="col-sm-5" title="">
              <input class="date-clear form-control form-text clockpicker date-popup-init" type="time" id="eTime" name="end-time" size="15" maxlength="10"></input>
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
              <label class="checkbox-inline">
                  <input type="checkbox" name="repeat" id="repeat-checkbox">
                  Repeat
              </label>

            </div>
          </div>

          <div id="repeat-content" class="hidden">

            <div class="form-group">
              <label class="col-sm-2">Repeat</label>
              <div class="col-sm-10">
                <label class="radio-inline">
                  <input id="rdaily" class="repeat-option" type="radio" name="repeats" value="DAILY" data-display-name="Day"></input>
                  Daily
                </label>
                <label class="radio-inline">
                  <input id="rweekly" class="repeat-option" type="radio" name="repeats" value="WEEKLY" checked data-display-name="Week"></input>
                  Weekly
                </label>
              </div>
            </div>

            <div id="daily-repeat-options" class="hidden repeat-option form-group">
              <label class="col-sm-2">Every</label>
              <div class="col-sm-10">
                <input id='daily-repeat-interval-option-1' type="radio" name="daily-interval" value="INTERVAL" checked></input>&nbsp;&nbsp;
                <div class="ib form-type-textfield form-item" title="">
                  <input id="daily-repeat-interval-option-1-interval-child" type="number" class="ib form-control num-input" name="repeats-every" size="5" maxlength="5" min="1" value="1"></input>
                </div>
                day
                <br>
                <input id='daily-repeat-interval-option-2' type="radio" name="daily-interval" value="every_weekday"></input>&nbsp;&nbsp;Every weekday
                <br>
                <input id='daily-repeat-interval-option-3' type="radio" name="daily-interval" value="every_mo_we_fr"></input>&nbsp;&nbsp;Every Mon, Wed, Fri
                <br>
                <input id='daily-repeat-interval-option-4' type="radio" name="daily-interval" value="every-tu-th"></input>&nbsp;&nbsp;Every Tue, Thu
                <br>
              </div>
            </div>

            <div id="weekly-repeat-options" class="repeat-option">
              <div class="form-group">
                <label class="col-sm-2">Every</label>
                <div class="col-sm-10">
                    <input id="weekly-repeat-interval-option-1-interval" type="number" class="form-control  num-input" name="repeats-every" size="20" maxlength="30" min="1" value="1"></input>
                    week
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2">On</label>
                <div class="col-sm-10">
                  <input class="repeat-day" type="checkbox" name="rsun" id="wrsun" value="SU"></input> Sun&nbsp;&nbsp;&nbsp;&nbsp;
                  <input class="repeat-day" type="checkbox" name="rmon" id="wrmon" value="MO"></input> Mon&nbsp;&nbsp;&nbsp;&nbsp;
                  <input class="repeat-day" type="checkbox" name="rtue" id="wrtue" value="TU"></input> Tue&nbsp;&nbsp;&nbsp;&nbsp;
                  <input class="repeat-day" type="checkbox" name="rwed" id="wrwed" value="WE"></input> Wed&nbsp;&nbsp;&nbsp;&nbsp;
                  <input class="repeat-day" type="checkbox" name="rthu" id="wrthu" value="TH"></input> Thu&nbsp;&nbsp;&nbsp;&nbsp;
                  <input class="repeat-day" type="checkbox" name="rfri" id="wrfri" value="FR"></input> Fri&nbsp;&nbsp;&nbsp;&nbsp;
                  <input class="repeat-day" type="checkbox" name="rsat" id="wrsat" value="SA"></input> Sat&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="col-sm-2">Stop After</label>
              <div class="col-sm-10">

                  <input id="stopafter" type="radio" name="stop-repeating" value="COUNT" checked></input>&nbsp;&nbsp;
                  <input id="num-occurrence" type="number" class="num-input" name="rafter-number" hint="#" value="5" size="20" maxlength="30" min="1"></input>
                  occurrences
                  <br><br>
                  <input id="stopon" type="radio"  name="stop-repeating" value="UNTIL"></input>&nbsp;&nbsp;
                  <input class="datepicker date-popup-init" type="date" id="repeatStopDate" name="ron-date" size="20" maxlength="30" value=""></input>

              </div>
            </div>

          </div><!-- /#repeat-content -->
        </form>
        <div class="modal-footer">
          <button class="btn btn-primary ladda-button form-submit" data-style="expand-left" id="edit-submit" name="op" value="Save" type="button"><span class="ladda-label">Save</span></button>
          <button class="btn btn-danger ladda-button form-submit hidden" data-style="expand-left" id="edit-remove" name="op" value="Remove" type="button">Remove</button>
          <button class="btn btn-default form-submit" id="edit-cancel" name="op" value="Cancel" type="button" data-dismiss="modal"><span class="ladda-label">Cancel</span></button>
        </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
