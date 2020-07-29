import { mapState } from "vuex";

export default {
    data() {
        return {
            menuKey: ""
        };
    },

    computed: {
        ...mapState("authority", {
            authority(state) {
                window.console.log('state', state)
                if (this.menuKey) {
                    return state.authorities[this.menuKey] || {};
                }
                return {};
            }
        })
    },

    methods: {
        goNoAuthPage() {
            this.$store.dispatch("delView", this.$route).then(() => {
                this.$router.replace("/noauth");
            });
        },

        judagePageAuth() {
            if (this.menuKey) {
                if (!this.$_.keys(this.authority).length && this.menuKey != 'home_page') {
                    this.goNoAuthPage();
                }
            }
        },

        clearFormValidate(formName) {
            if (this.$refs[formName]) {
                setTimeout(() => {
                    this.$refs[formName].clearValidate()
                }, 200)
            }
        }
    },

    created() {
        this.judagePageAuth()
    },

    activated() {
        this.judagePageAuth()
    }
};
