<template>
    <p class="alert alert-{{ bsClass }} alert-dismissible fade in" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close" v-if=" ! important">
            <span aria-hidden="true">&times;</span>
        </button>
        <i class="fa fa-{{icon }}"></i> <strong>{{ intro }}</strong>&nbsp;<slot></slot>
    </p>
</template>

<script>
    export default{
        props: {
            type: {
                default: "info"
            },
            important: false,
        },
        data() {
            return {
                icon: '',
                intro: '',
                bsClass: 'info'
            }
        },
        ready() {
            switch (this.type) {
                case 'success':
                    this.intro = "Well Done:";
                    this.icon = "check-circle";
                    this.bsClass = "success";
                    break;

                case "error":
                case "danger":
                        this.intro = "Oh Poop!";
                        this.icon = "exclamation-triangle";
                        this.type = "error";
                        this.bsClass = "danger";
                        break;

                case "warning":
                    this.intro = "Warning!";
                    this.icon = "exclamation-circle";
                    this.bsClass = "warning";
                    break;

                case "info":
                default:
                    this.intro = "Heads Up!";
                    this.icon = "info-circle";
                    this.bsClass = "info";

                return;
            }
        }
    }
</script>
