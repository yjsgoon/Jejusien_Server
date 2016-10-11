/**
 * Created by JiSoo on 2016-10-05.
 */

var div = function () {
    return {
        $: $('<div></div>'),
        appendTo: function(target) {
            this.$.appendTo(target);
            return this;
        },
        text: function(value) {
            this.$.text(value);
            return this;
        },
        color: function(value) {
            this.$.css('background-color',value);
            return this;
        },
        fontsize: function(px) {
            this.$.css('font-size',px);
            return this;
        },
        border: function(value) {
            this.$.css('border-style',value);
            return this;
        },
        border_width: function(value) {
            this.$.css('border-width',value);
            return this;
        },
        margin: function(top) {
            this.$.css('margin-top',top);
            return this;
        }

    }
};