<Modal>
    <!--<a class="btn btn-primary" data-toggle="modal" href="#bilbi-modal">Trigger modal</a>-->
    <div class="modal fade" id="bilbi-modal">
    	<div class="modal-dialog">
    		<div class="modal-content">
    			<div class="modal-header">
    				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
    				<h4 class="modal-title">{{ title }}</h4>
    			</div>
    			<div class="modal-body">
    				{{ content }}
    			</div>
    			<div class="modal-footer">
    				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
    				<button type="button" class="btn btn-primary">Save changes</button>
    			</div>
    		</div><!-- /.modal-content -->
    	</div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
</Modal>

<style lang="scss">
</style>

<script>
    export default{
        data(){
            return{
                msg:'hello vue',
                title: '',
                content: ''
            }
        },
        components:{
        }
    }
</script>
