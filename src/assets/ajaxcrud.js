/*!
 * Ajax Crud 
 * =================================
 * Use for johnitvn/yii2-ajaxcrud extension
 * @author John Martin john.itvn@gmail.com
 */
$(document).ready(function () {

    // Create instance of Modal Remote
    // This instance will be the controller of all business logic of modal
    // Backwards compatible lookup of old ajaxCrubModal ID
    if ($('#ajaxCrubModal').length > 0 && $('#ajaxCrudModal').length == 0) {
        modal = new ModalRemote('#ajaxCrubModal');
    } else {
        modal = new ModalRemote('#ajaxCrudModal');
    }

    // if($('.bs-canvas').length >0)
    // {
    //     offCanvas = new ModalRemote($('.bs-canvas').attr('id'),true);
    //     offCanvas.successCallback = showCanvas($('.bs-canvas').attr('id'))
    // }

    // function showCanvas(elm)
    // {
    //     $('#'+elm).addClass('mr-0');
    //     $('[data-target="' + elm + '"], a[href="' + elm + '"]').attr('aria-expanded', "true");
	// 	$(elm + ' .bs-canvas-close').attr('aria-expanded', "true");
	// 	$('[data-target="' + elm + '"], a[href="' + elm + '"]').attr('aria-expanded', "true");

	// 	return false;
    // }

    // $('[data-toggle="offcanvas"]').on('click', function(event){
    //     event.preventDefault();
    //     offCanvas.open(this, null);
    // });

    // $('.bs-canvas-close, .bs-canvas-overlay').on('click', function(){
    //     var elm;
	// 	if($(this).hasClass('bs-canvas-close')) {
	// 		elm = $(this).closest('.bs-canvas');
	// 		$('[data-target="' + elm + '"], a[href="' + elm + '"]').attr('aria-expanded', "false");
	// 	} else {
	// 		elm = $('.bs-canvas')
	// 		$('[data-toggle="canvas"]').attr('aria-expanded', "false");	
	// 	}
	// 	elm.removeClass('mr-0');
	// 	$('.bs-canvas-close', elm).attr('aria-expanded', "false");
	// 	if(offCanvas.bsOverlay.length)
    //         offCanvas.bsOverlay.removeClass('show');
	// 	return false;
    // });
    // Catch click event on all buttons that want to open a modal
    $(document).on('click', '[role="modal-remote"]', function (event) {
        event.preventDefault();

        // Open modal
        modal.open(this, null);
    });

    // Catch click event on all buttons that want to open a modal
    // with bulk action
    $(document).on('click', '[role="modal-remote-bulk"]', function (event) {
        event.preventDefault();

        // Collect all selected ID's
        var selectedIds = [];
        
        // See if we have a selector set
        var selection = 'selection';
        if ($(this).data("selector") != null) {
        	selection = $(this).data("selector");
        }
        
        $('input:checkbox[name="' + selection + '[]"]').each(function () {
            if (this.checked)
                selectedIds.push($(this).val());
        });

        if (selectedIds.length == 0) {
            // If no selected ID's show warning
            modal.show();
            modal.setTitle('No selection');
            modal.setContent('You must select item(s) to use this action');
            modal.addFooterButton("Close", 'btn btn-default', function (button, event) {
                this.hide();
            });
        } else {
            // Open modal
            modal.open(this, selectedIds);
        }
    });
});
