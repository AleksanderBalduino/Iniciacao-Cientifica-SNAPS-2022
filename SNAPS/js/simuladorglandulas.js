/* */
(function(){var t,e,s,i,r={}.hasOwnProperty;(i=function(){function t(){this.options_index=0,this.parsed=[]}return t.prototype.add_node=function(t){return"OPTGROUP"===t.nodeName.toUpperCase()?this.add_group(t):this.add_option(t)},t.prototype.add_group=function(t){var e,s,i,r,o,n;for(e=this.parsed.length,this.parsed.push({array_index:e,group:!0,label:this.escapeExpression(t.label),title:t.title?t.title:void 0,children:0,disabled:t.disabled,classes:t.className}),n=[],i=0,r=(o=t.childNodes).length;i<r;i++)s=o[i],n.push(this.add_option(s,e,t.disabled));return n},t.prototype.add_option=function(t,e,s){if("OPTION"===t.nodeName.toUpperCase())return""!==t.text?(null!=e&&(this.parsed[e].children+=1),this.parsed.push({array_index:this.parsed.length,options_index:this.options_index,value:t.value,text:t.text,html:t.innerHTML,title:t.title?t.title:void 0,selected:t.selected,disabled:!0===s?s:t.disabled,group_array_index:e,group_label:null!=e?this.parsed[e].label:null,classes:t.className,style:t.style.cssText})):this.parsed.push({array_index:this.parsed.length,options_index:this.options_index,empty:!0}),this.options_index+=1},t.prototype.escapeExpression=function(t){var e,s;return null==t||!1===t?"":/[\&\<\>\"\'\`]/.test(t)?(e={"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},s=/&(?!\w+;)|[\<\>\"\'\`]/g,t.replace(s,function(t){return e[t]||"&amp;"})):t},t}()).select_to_array=function(t){var e,s,r,o,n;for(s=new i,r=0,o=(n=t.childNodes).length;r<o;r++)e=n[r],s.add_node(e);return s.parsed},e=function(){function t(e,s){this.form_field=e,this.options=null!=s?s:{},t.browser_is_supported()&&(this.is_multiple=this.form_field.multiple,this.set_default_text(),this.set_default_values(),this.setup(),this.set_up_html(),this.register_observers(),this.on_ready())}return t.prototype.set_default_values=function(){var t=this;return this.click_test_action=function(e){return t.test_active_click(e)},this.activate_action=function(e){return t.activate_field(e)},this.active_field=!1,this.mouse_on_container=!1,this.results_showing=!1,this.result_highlighted=null,this.allow_single_deselect=null!=this.options.allow_single_deselect&&null!=this.form_field.options[0]&&""===this.form_field.options[0].text&&this.options.allow_single_deselect,this.disable_search_threshold=this.options.disable_search_threshold||0,this.disable_search=this.options.disable_search||!1,this.enable_split_word_search=null==this.options.enable_split_word_search||this.options.enable_split_word_search,this.group_search=null==this.options.group_search||this.options.group_search,this.search_contains=this.options.search_contains||!1,this.single_backstroke_delete=null==this.options.single_backstroke_delete||this.options.single_backstroke_delete,this.max_selected_options=this.options.max_selected_options||1/0,this.inherit_select_classes=this.options.inherit_select_classes||!1,this.display_selected_options=null==this.options.display_selected_options||this.options.display_selected_options,this.display_disabled_options=null==this.options.display_disabled_options||this.options.display_disabled_options,this.include_group_label_in_selected=this.options.include_group_label_in_selected||!1,this.max_shown_results=this.options.max_shown_results||Number.POSITIVE_INFINITY,this.case_sensitive_search=this.options.case_sensitive_search||!1},t.prototype.set_default_text=function(){return this.form_field.getAttribute("data-placeholder")?this.default_text=this.form_field.getAttribute("data-placeholder"):this.is_multiple?this.default_text=this.options.placeholder_text_multiple||this.options.placeholder_text||t.default_multiple_text:this.default_text=this.options.placeholder_text_single||this.options.placeholder_text||t.default_single_text,this.results_none_found=this.form_field.getAttribute("data-no_results_text")||this.options.no_results_text||t.default_no_result_text},t.prototype.choice_label=function(t){return this.include_group_label_in_selected&&null!=t.group_label?"<b class='group-name'>"+t.group_label+"</b>"+t.html:t.html},t.prototype.mouse_enter=function(){return this.mouse_on_container=!0},t.prototype.mouse_leave=function(){return this.mouse_on_container=!1},t.prototype.input_focus=function(t){var e=this;if(this.is_multiple){if(!this.active_field)return setTimeout(function(){return e.container_mousedown()},50)}else if(!this.active_field)return this.activate_field()},t.prototype.input_blur=function(t){var e=this;if(!this.mouse_on_container)return this.active_field=!1,setTimeout(function(){return e.blur_test()},100)},t.prototype.results_option_build=function(t){var e,s,i,r,o,n,l;for(e="",r=0,o=0,n=(l=this.results_data).length;o<n&&(i="",""!==(i=(s=l[o]).group?this.result_add_group(s):this.result_add_option(s))&&(r++,e+=i),(null!=t?t.first:void 0)&&(s.selected&&this.is_multiple?this.choice_build(s):s.selected&&!this.is_multiple&&this.single_set_selected_text(this.choice_label(s))),!(r>=this.max_shown_results));o++);return e},t.prototype.result_add_option=function(t){var e,s;return t.search_match&&this.include_option_in_results(t)?(e=[],t.disabled||t.selected&&this.is_multiple||e.push("active-result"),!t.disabled||t.selected&&this.is_multiple||e.push("disabled-result"),t.selected&&e.push("result-selected"),null!=t.group_array_index&&e.push("group-option"),""!==t.classes&&e.push(t.classes),(s=document.createElement("li")).className=e.join(" "),s.style.cssText=t.style,s.setAttribute("data-option-array-index",t.array_index),s.innerHTML=t.search_text,t.title&&(s.title=t.title),this.outerHTML(s)):""},t.prototype.result_add_group=function(t){var e,s;return(t.search_match||t.group_match)&&t.active_options>0?((e=[]).push("group-result"),t.classes&&e.push(t.classes),(s=document.createElement("li")).className=e.join(" "),s.innerHTML=t.search_text,t.title&&(s.title=t.title),this.outerHTML(s)):""},t.prototype.results_update_field=function(){if(this.set_default_text(),this.is_multiple||this.results_reset_cleanup(),this.result_clear_highlight(),this.results_build(),this.results_showing)return this.winnow_results()},t.prototype.reset_single_select_options=function(){var t,e,s,i,r;for(r=[],e=0,s=(i=this.results_data).length;e<s;e++)(t=i[e]).selected?r.push(t.selected=!1):r.push(void 0);return r},t.prototype.results_toggle=function(){return this.results_showing?this.results_hide():this.results_show()},t.prototype.results_search=function(t){return this.results_showing?this.winnow_results():this.results_show()},t.prototype.winnow_results=function(){var t,e,s,i,r,o,n,l,h,c,a,_;for(this.no_results_clear(),i=0,t=(o=this.get_search_text()).replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),h=new RegExp(t,"i"),s=this.get_search_regex(t),c=0,a=(_=this.results_data).length;c<a;c++)(e=_[c]).search_match=!1,r=null,this.include_option_in_results(e)&&(e.group&&(e.group_match=!1,e.active_options=0),null!=e.group_array_index&&this.results_data[e.group_array_index]&&(0===(r=this.results_data[e.group_array_index]).active_options&&r.search_match&&(i+=1),r.active_options+=1),e.search_text=e.group?e.label:e.html,e.group&&!this.group_search||(e.search_match=this.search_string_match(e.search_text,s),e.search_match&&!e.group&&(i+=1),e.search_match?(o.length&&(n=e.search_text.search(h),l=e.search_text.substr(0,n+o.length)+"</em>"+e.search_text.substr(n+o.length),e.search_text=l.substr(0,n)+"<em>"+l.substr(n)),null!=r&&(r.group_match=!0)):null!=e.group_array_index&&this.results_data[e.group_array_index].search_match&&(e.search_match=!0)));return this.result_clear_highlight(),i<1&&o.length?(this.update_results_content(""),this.no_results(o)):(this.update_results_content(this.results_option_build()),this.winnow_results_set_highlight())},t.prototype.get_search_regex=function(t){var e,s;return e=this.search_contains?"":"^",s=this.case_sensitive_search?"":"i",new RegExp(e+t,s)},t.prototype.search_string_match=function(t,e){var s,i,r,o;if(e.test(t))return!0;if(this.enable_split_word_search&&(t.indexOf(" ")>=0||0===t.indexOf("["))&&(i=t.replace(/\[|\]/g,"").split(" ")).length)for(r=0,o=i.length;r<o;r++)if(s=i[r],e.test(s))return!0},t.prototype.choices_count=function(){var t,e,s;if(null!=this.selected_option_count)return this.selected_option_count;for(this.selected_option_count=0,t=0,e=(s=this.form_field.options).length;t<e;t++)s[t].selected&&(this.selected_option_count+=1);return this.selected_option_count},t.prototype.choices_click=function(t){if(t.preventDefault(),!this.results_showing&&!this.is_disabled)return this.results_show()},t.prototype.keyup_checker=function(t){var e,s;switch(e=null!=(s=t.which)?s:t.keyCode,this.search_field_scale(),e){case 8:if(this.is_multiple&&this.backstroke_length<1&&this.choices_count()>0)return this.keydown_backstroke();if(!this.pending_backstroke)return this.result_clear_highlight(),this.results_search();break;case 13:if(t.preventDefault(),this.results_showing)return this.result_select(t);break;case 27:return this.results_showing&&this.results_hide(),!0;case 9:case 38:case 40:case 16:case 91:case 17:case 18:break;default:return this.results_search()}},t.prototype.clipboard_event_checker=function(t){var e=this;return setTimeout(function(){return e.results_search()},50)},t.prototype.container_width=function(){return null!=this.options.width?this.options.width:this.form_field.offsetWidth+"px"},t.prototype.include_option_in_results=function(t){return!(this.is_multiple&&!this.display_selected_options&&t.selected)&&(!(!this.display_disabled_options&&t.disabled)&&!t.empty)},t.prototype.search_results_touchstart=function(t){return this.touch_started=!0,this.search_results_mouseover(t)},t.prototype.search_results_touchmove=function(t){return this.touch_started=!1,this.search_results_mouseout(t)},t.prototype.search_results_touchend=function(t){if(this.touch_started)return this.search_results_mouseup(t)},t.prototype.outerHTML=function(t){var e;return t.outerHTML?t.outerHTML:((e=document.createElement("div")).appendChild(t),e.innerHTML)},t.browser_is_supported=function(){return"Microsoft Internet Explorer"===window.navigator.appName?document.documentMode>=8:(/iP(od|hone)/i.test(window.navigator.userAgent)||/IEMobile/i.test(window.navigator.userAgent)||/Windows Phone/i.test(window.navigator.userAgent)||/BlackBerry/i.test(window.navigator.userAgent)||/BB10/i.test(window.navigator.userAgent)||/Android.*Mobile/i.test(window.navigator.userAgent),!0)},t.default_multiple_text="Select Some Options",t.default_single_text="Select an Option",t.default_no_result_text="No results match",t}(),(t=jQuery).fn.extend({chosen:function(i){return e.browser_is_supported()?this.each(function(e){var r,o;o=(r=t(this)).data("chosen"),"destroy"!==i?o instanceof s||r.data("chosen",new s(this,i)):o instanceof s&&o.destroy()}):this}}),s=function(s){function o(){return o.__super__.constructor.apply(this,arguments)}return function(t,e){for(var s in e)r.call(e,s)&&(t[s]=e[s]);function i(){this.constructor=t}i.prototype=e.prototype,t.prototype=new i,t.__super__=e.prototype}(o,e),o.prototype.setup=function(){return this.form_field_jq=t(this.form_field),this.current_selectedIndex=this.form_field.selectedIndex,this.is_rtl=this.form_field_jq.hasClass("chosen-rtl")},o.prototype.set_up_html=function(){var e,s;return(e=["chosen-container"]).push("chosen-container-"+(this.is_multiple?"multi":"single")),this.inherit_select_classes&&this.form_field.className&&e.push(this.form_field.className),this.is_rtl&&e.push("chosen-rtl"),s={class:e.join(" "),style:"width: "+this.container_width()+";",title:this.form_field.title},this.form_field.id.length&&(s.id=this.form_field.id.replace(/[^\w]/g,"_")+"_chosen"),this.container=t("<div />",s),this.is_multiple?this.container.html('<ul class="chosen-choices"><li class="search-field"><input type="text" value="'+this.default_text+'" class="default" autocomplete="off" style="width:25px;" /></li></ul><div class="chosen-drop"><ul class="chosen-results"></ul></div>'):this.container.html('<a class="chosen-single chosen-default"><span>'+this.default_text+'</span><div><b></b></div></a><div class="chosen-drop"><div class="chosen-search"><input type="text" autocomplete="off" /></div><ul class="chosen-results"></ul></div>'),this.form_field_jq.hide().after(this.container),this.dropdown=this.container.find("div.chosen-drop").first(),this.search_field=this.container.find("input").first(),this.search_results=this.container.find("ul.chosen-results").first(),this.search_field_scale(),this.search_no_results=this.container.find("li.no-results").first(),this.is_multiple?(this.search_choices=this.container.find("ul.chosen-choices").first(),this.search_container=this.container.find("li.search-field").first()):(this.search_container=this.container.find("div.chosen-search").first(),this.selected_item=this.container.find(".chosen-single").first()),this.results_build(),this.set_tab_index(),this.set_label_behavior()},o.prototype.on_ready=function(){return this.form_field_jq.trigger("chosen:ready",{chosen:this})},o.prototype.register_observers=function(){var t=this;return this.container.bind("touchstart.chosen",function(e){return t.container_mousedown(e),e.preventDefault()}),this.container.bind("touchend.chosen",function(e){return t.container_mouseup(e),e.preventDefault()}),this.container.bind("mousedown.chosen",function(e){t.container_mousedown(e)}),this.container.bind("mouseup.chosen",function(e){t.container_mouseup(e)}),this.container.bind("mouseenter.chosen",function(e){t.mouse_enter(e)}),this.container.bind("mouseleave.chosen",function(e){t.mouse_leave(e)}),this.search_results.bind("mouseup.chosen",function(e){t.search_results_mouseup(e)}),this.search_results.bind("mouseover.chosen",function(e){t.search_results_mouseover(e)}),this.search_results.bind("mouseout.chosen",function(e){t.search_results_mouseout(e)}),this.search_results.bind("mousewheel.chosen DOMMouseScroll.chosen",function(e){t.search_results_mousewheel(e)}),this.search_results.bind("touchstart.chosen",function(e){t.search_results_touchstart(e)}),this.search_results.bind("touchmove.chosen",function(e){t.search_results_touchmove(e)}),this.search_results.bind("touchend.chosen",function(e){t.search_results_touchend(e)}),this.form_field_jq.bind("chosen:updated.chosen",function(e){t.results_update_field(e)}),this.form_field_jq.bind("chosen:activate.chosen",function(e){t.activate_field(e)}),this.form_field_jq.bind("chosen:open.chosen",function(e){t.container_mousedown(e)}),this.form_field_jq.bind("chosen:close.chosen",function(e){t.input_blur(e)}),this.search_field.bind("blur.chosen",function(e){t.input_blur(e)}),this.search_field.bind("keyup.chosen",function(e){t.keyup_checker(e)}),this.search_field.bind("keydown.chosen",function(e){t.keydown_checker(e)}),this.search_field.bind("focus.chosen",function(e){t.input_focus(e)}),this.search_field.bind("cut.chosen",function(e){t.clipboard_event_checker(e)}),this.search_field.bind("paste.chosen",function(e){t.clipboard_event_checker(e)}),this.is_multiple?this.search_choices.bind("click.chosen",function(e){t.choices_click(e)}):this.container.bind("click.chosen",function(t){t.preventDefault()})},o.prototype.destroy=function(){return t(this.container[0].ownerDocument).unbind("click.chosen",this.click_test_action),this.search_field[0].tabIndex&&(this.form_field_jq[0].tabIndex=this.search_field[0].tabIndex),this.container.remove(),this.form_field_jq.removeData("chosen"),this.form_field_jq.show()},o.prototype.search_field_disabled=function(){return this.is_disabled=this.form_field_jq[0].disabled,this.is_disabled?(this.container.addClass("chosen-disabled"),this.search_field[0].disabled=!0,this.is_multiple||this.selected_item.unbind("focus.chosen",this.activate_action),this.close_field()):(this.container.removeClass("chosen-disabled"),this.search_field[0].disabled=!1,this.is_multiple?void 0:this.selected_item.bind("focus.chosen",this.activate_action))},o.prototype.container_mousedown=function(e){if(!this.is_disabled&&(e&&"mousedown"===e.type&&!this.results_showing&&e.preventDefault(),null==e||!t(e.target).hasClass("search-choice-close")))return this.active_field?this.is_multiple||!e||t(e.target)[0]!==this.selected_item[0]&&!t(e.target).parents("a.chosen-single").length||(e.preventDefault(),this.results_toggle()):(this.is_multiple&&this.search_field.val(""),t(this.container[0].ownerDocument).bind("click.chosen",this.click_test_action),this.results_show()),this.activate_field()},o.prototype.container_mouseup=function(t){if("ABBR"===t.target.nodeName&&!this.is_disabled)return this.results_reset(t)},o.prototype.search_results_mousewheel=function(t){var e;if(t.originalEvent&&(e=t.originalEvent.deltaY||-t.originalEvent.wheelDelta||t.originalEvent.detail),null!=e)return t.preventDefault(),"DOMMouseScroll"===t.type&&(e*=40),this.search_results.scrollTop(e+this.search_results.scrollTop())},o.prototype.blur_test=function(t){if(!this.active_field&&this.container.hasClass("chosen-container-active"))return this.close_field()},o.prototype.close_field=function(){return t(this.container[0].ownerDocument).unbind("click.chosen",this.click_test_action),this.active_field=!1,this.results_hide(),this.container.removeClass("chosen-container-active"),this.clear_backstroke(),this.show_search_field_default(),this.search_field_scale()},o.prototype.activate_field=function(){return this.container.addClass("chosen-container-active"),this.active_field=!0,this.search_field.val(this.search_field.val()),this.search_field.focus()},o.prototype.test_active_click=function(e){var s;return(s=t(e.target).closest(".chosen-container")).length&&this.container[0]===s[0]?this.active_field=!0:this.close_field()},o.prototype.results_build=function(){return this.parsing=!0,this.selected_option_count=null,this.results_data=i.select_to_array(this.form_field),this.is_multiple?this.search_choices.find("li.search-choice").remove():this.is_multiple||(this.single_set_selected_text(),this.disable_search||this.form_field.options.length<=this.disable_search_threshold?(this.search_field[0].readOnly=!0,this.container.addClass("chosen-container-single-nosearch")):(this.search_field[0].readOnly=!1,this.container.removeClass("chosen-container-single-nosearch"))),this.update_results_content(this.results_option_build({first:!0})),this.search_field_disabled(),this.show_search_field_default(),this.search_field_scale(),this.parsing=!1},o.prototype.result_do_highlight=function(t){var e,s,i,r,o;if(t.length){if(this.result_clear_highlight(),this.result_highlight=t,this.result_highlight.addClass("highlighted"),r=(i=parseInt(this.search_results.css("maxHeight"),10))+(o=this.search_results.scrollTop()),(e=(s=this.result_highlight.position().top+this.search_results.scrollTop())+this.result_highlight.outerHeight())>=r)return this.search_results.scrollTop(e-i>0?e-i:0);if(s<o)return this.search_results.scrollTop(s)}},o.prototype.result_clear_highlight=function(){return this.result_highlight&&this.result_highlight.removeClass("highlighted"),this.result_highlight=null},o.prototype.results_show=function(){return this.is_multiple&&this.max_selected_options<=this.choices_count()?(this.form_field_jq.trigger("chosen:maxselected",{chosen:this}),!1):(this.container.addClass("chosen-with-drop"),this.results_showing=!0,this.search_field.focus(),this.search_field.val(this.search_field.val()),this.winnow_results(),this.form_field_jq.trigger("chosen:showing_dropdown",{chosen:this}))},o.prototype.update_results_content=function(t){return this.search_results.html(t)},o.prototype.results_hide=function(){return this.results_showing&&(this.result_clear_highlight(),this.container.removeClass("chosen-with-drop"),this.form_field_jq.trigger("chosen:hiding_dropdown",{chosen:this})),this.results_showing=!1},o.prototype.set_tab_index=function(t){var e;if(this.form_field.tabIndex)return e=this.form_field.tabIndex,this.form_field.tabIndex=-1,this.search_field[0].tabIndex=e},o.prototype.set_label_behavior=function(){var e=this;if(this.form_field_label=this.form_field_jq.parents("label"),!this.form_field_label.length&&this.form_field.id.length&&(this.form_field_label=t("label[for='"+this.form_field.id+"']")),this.form_field_label.length>0)return this.form_field_label.bind("click.chosen",function(t){return e.is_multiple?e.container_mousedown(t):e.activate_field()})},o.prototype.show_search_field_default=function(){return this.is_multiple&&this.choices_count()<1&&!this.active_field?(this.search_field.val(this.default_text),this.search_field.addClass("default")):(this.search_field.val(""),this.search_field.removeClass("default"))},o.prototype.search_results_mouseup=function(e){var s;if((s=t(e.target).hasClass("active-result")?t(e.target):t(e.target).parents(".active-result").first()).length)return this.result_highlight=s,this.result_select(e),this.search_field.focus()},o.prototype.search_results_mouseover=function(e){var s;if(s=t(e.target).hasClass("active-result")?t(e.target):t(e.target).parents(".active-result").first())return this.result_do_highlight(s)},o.prototype.search_results_mouseout=function(e){if(t(e.target).hasClass("active-result"))return this.result_clear_highlight()},o.prototype.choice_build=function(e){var s,i,r=this;return s=t("<li />",{class:"search-choice"}).html("<span>"+this.choice_label(e)+"</span>"),e.disabled?s.addClass("search-choice-disabled"):((i=t("<a />",{class:"search-choice-close","data-option-array-index":e.array_index})).bind("click.chosen",function(t){return r.choice_destroy_link_click(t)}),s.append(i)),this.search_container.before(s)},o.prototype.choice_destroy_link_click=function(e){if(e.preventDefault(),e.stopPropagation(),!this.is_disabled)return this.choice_destroy(t(e.target))},o.prototype.choice_destroy=function(t){if(this.result_deselect(t[0].getAttribute("data-option-array-index")))return this.show_search_field_default(),this.is_multiple&&this.choices_count()>0&&this.search_field.val().length<1&&this.results_hide(),t.parents("li").first().remove(),this.search_field_scale()},o.prototype.results_reset=function(){if(this.reset_single_select_options(),this.form_field.options[0].selected==0,this.single_set_selected_text(),this.show_search_field_default(),this.results_reset_cleanup(),this.form_field_jq.trigger("change"),this.active_field)return this.results_hide()},o.prototype.results_reset_cleanup=function(){return this.current_selectedIndex=this.form_field.selectedIndex,this.selected_item.find("abbr").remove()},o.prototype.result_select=function(t){var e,s;if(this.result_highlight)return e=this.result_highlight,this.result_clear_highlight(),this.is_multiple&&this.max_selected_options<=this.choices_count()?(this.form_field_jq.trigger("chosen:maxselected",{chosen:this}),!1):(this.is_multiple?e.removeClass("active-result"):this.reset_single_select_options(),e.addClass("result-selected"),(s=this.results_data[e[0].getAttribute("data-option-array-index")]).selected=!0,this.form_field.options[s.options_index].selected=!0,this.selected_option_count=null,this.is_multiple?this.choice_build(s):this.single_set_selected_text(this.choice_label(s)),(t.metaKey||t.ctrlKey)&&this.is_multiple||this.results_hide(),this.show_search_field_default(),(this.is_multiple||this.form_field.selectedIndex!==this.current_selectedIndex)&&this.form_field_jq.trigger("change",{selected:this.form_field.options[s.options_index].value}),this.current_selectedIndex=this.form_field.selectedIndex,t.preventDefault(),this.search_field_scale())},o.prototype.single_set_selected_text=function(t){return null==t&&(t=this.default_text),t===this.default_text?this.selected_item.addClass("chosen-default"):(this.single_deselect_control_build(),this.selected_item.removeClass("chosen-default")),this.selected_item.find("span").html(t)},o.prototype.result_deselect=function(t){var e;return e=this.results_data[t],!this.form_field.options[e.options_index].disabled&&(e.selected=!1,this.form_field.options[e.options_index].selected=!1,this.selected_option_count=null,this.result_clear_highlight(),this.results_showing&&this.winnow_results(),this.form_field_jq.trigger("change",{deselected:this.form_field.options[e.options_index].value}),this.search_field_scale(),!0)},o.prototype.single_deselect_control_build=function(){if(this.allow_single_deselect)return this.selected_item.find("abbr").length||this.selected_item.find("span").first().after('<abbr class="search-choice-close"></abbr>'),this.selected_item.addClass("chosen-single-with-deselect")},o.prototype.get_search_text=function(){return t("<div/>").text(t.trim(this.search_field.val())).html()},o.prototype.winnow_results_set_highlight=function(){var t,e;if(null!=(t=(e=this.is_multiple?[]:this.search_results.find(".result-selected.active-result")).length?e.first():this.search_results.find(".active-result").first()))return this.result_do_highlight(t)},o.prototype.no_results=function(e){var s;return(s=t('<li class="no-results">'+this.results_none_found+' "<span></span>"</li>')).find("span").first().html(e),this.search_results.append(s),this.form_field_jq.trigger("chosen:no_results",{chosen:this})},o.prototype.no_results_clear=function(){return this.search_results.find(".no-results").remove()},o.prototype.keydown_arrow=function(){var t;return this.results_showing&&this.result_highlight?(t=this.result_highlight.nextAll("li.active-result").first())?this.result_do_highlight(t):void 0:this.results_show()},o.prototype.keyup_arrow=function(){var t;return this.results_showing||this.is_multiple?this.result_highlight?(t=this.result_highlight.prevAll("li.active-result")).length?this.result_do_highlight(t.first()):(this.choices_count()>0&&this.results_hide(),this.result_clear_highlight()):void 0:this.results_show()},o.prototype.keydown_backstroke=function(){var t;return this.pending_backstroke?(this.choice_destroy(this.pending_backstroke.find("a").first()),this.clear_backstroke()):(t=this.search_container.siblings("li.search-choice").last()).length&&!t.hasClass("search-choice-disabled")?(this.pending_backstroke=t,this.single_backstroke_delete?this.keydown_backstroke():this.pending_backstroke.addClass("search-choice-focus")):void 0},o.prototype.clear_backstroke=function(){return this.pending_backstroke&&this.pending_backstroke.removeClass("search-choice-focus"),this.pending_backstroke=null},o.prototype.keydown_checker=function(t){var e,s;switch(e=null!=(s=t.which)?s:t.keyCode,this.search_field_scale(),8!==e&&this.pending_backstroke&&this.clear_backstroke(),e){case 8:this.backstroke_length=this.search_field.val().length;break;case 9:this.results_showing&&!this.is_multiple&&this.result_select(t),this.mouse_on_container=!1;break;case 13:this.results_showing&&t.preventDefault();break;case 32:this.disable_search&&t.preventDefault();break;case 38:t.preventDefault(),this.keyup_arrow();break;case 40:t.preventDefault(),this.keydown_arrow()}},o.prototype.search_field_scale=function(){var e,s,i,r,o,n,l,h;if(this.is_multiple){for(0,n=0,r="position:absolute; left: -1000px; top: -1000px; display:none;",l=0,h=(o=["font-size","font-style","font-weight","font-family","line-height","text-transform","letter-spacing"]).length;l<h;l++)r+=(i=o[l])+":"+this.search_field.css(i)+";";return(e=t("<div />",{style:r})).text(this.search_field.val()),t("body").append(e),n=e.width()+25,e.remove(),n>(s=this.container.outerWidth())-10&&(n=s-10),this.search_field.css({width:n+"px"})}},o}()}).call(this);

//Init
$.js = function (el) {
    return $('[data-js=' + el + ']')
};

function chosen() {
    $(".chosen-select").chosen({
      disable_search_threshold: 100,
      inherit_select_classes: true,
      width: '100%'
    }).on('chosen:showing_dropdown', function (evt, params) {
      $(this).parent().addClass('is-active');
      $.js('custom-scroll').find(".chosen-results").niceScroll({
        cursorcolor:"#000",
        cursorwidth:"10px",
        background:"#eeeeee",
        cursorborder:"1px solid #eeeeee",
        cursorborderradius:0,
        cursoropacitymin:1,
      });
    }).on('chosen:hiding_dropdown', function (evt, params) {
      $(this).parent().removeClass('is-active');
    });
}

chosen();

/* */
function moveToSelected(element) {

  if (element == "next") {
    var selected = $(".selected").next();
  } else if (element == "prev") {
    var selected = $(".selected").prev();
  } else {
    var selected = element;
  }

  var next = $(selected).next();
  var prev = $(selected).prev();
  var prevSecond = $(prev).prev();
  var nextSecond = $(next).next();

  $(selected).removeClass().addClass("selected");

  $(prev).removeClass().addClass("prevDir option");
  $(next).removeClass().addClass("nextDir option");

  $(nextSecond).removeClass().addClass("nextPontaDir option");
  $(prevSecond).removeClass().addClass("prevPontaDir option");

  const containbeta = document.querySelector('#beta');

  if (containbeta.classList.contains('option') == true){
    $(".btnbeta").removeClass("btn-hover-anim");
    $("#BetaBasal, #BetaAtivado, #BetaParcialmenteAtivado, #BetaBloqueado").addClass("disabled");
  }
  else if(containbeta.classList.contains('option') == false){
    setTimeout(function () {
      $(".btnbeta").addClass("btn-hover-anim");
      $("#BetaBasal, #BetaAtivado, #BetaParcialmenteAtivado, #BetaBloqueado").removeClass("disabled");
    }, 2000);
  }

  const containalfa = document.querySelector('#alfa');

  if (containalfa.classList.contains('option') == true){
    $(".btnalfa").removeClass("btn-hover-anim");
    $("#AlfaBasal, #AlfaAtivado, #AlfaParcialmenteAtivado, #AlfaBloqueado").addClass("disabled");
  }
  else if(containalfa.classList.contains('option') == false){
    setTimeout(function () {
      $(".btnalfa").addClass("btn-hover-anim");
      $("#AlfaBasal, #AlfaAtivado, #AlfaParcialmenteAtivado, #AlfaBloqueado").removeClass("disabled");
    }, 2000);
  }

  const containmuscarinico = document.querySelector('#muscarinico');

  if (containmuscarinico.classList.contains('option') == true){
    $(".btnmuscarinico").removeClass("btn-hover-anim");
    $("#MuscarinicoBasal, #MuscarinicoAtivado, #MuscarinicoParcialmenteAtivado, #MuscarinicoBloqueado").addClass("disabled");
  }
  else if(containmuscarinico.classList.contains('option') == false){
    setTimeout(function () {
      $(".btnmuscarinico").addClass("btn-hover-anim");
      $("#MuscarinicoBasal, #MuscarinicoAtivado, #MuscarinicoParcialmenteAtivado, #MuscarinicoBloqueado").removeClass("disabled");
    }, 2000);
  }
};

$('#carousel div').click(function() {
  moveToSelected($(this));
});

$('#prev').click(function() {
  moveToSelected('prev');
});

$('#next').click(function() {
  moveToSelected('next');
});

function modalClose() {
  if (location.hash == '#openBetaBasal' || location.hash == '#openBetaAtivado' || location.hash == '#openBetaParcialmenteAtivado' || location.hash == '#openBetaBloqueado'
      || location.hash == '#openAlfaBasal' || location.hash == '#openAlfaAtivado' || location.hash == '#openAlfaParcialmenteAtivado' || location.hash == '#openAlfaBloqueado'
      || location.hash == '#openMuscarinicoBasal' || location.hash == '#openMuscarinicoAtivado' || location.hash == '#openMuscarinicoParcialmenteAtivado' || location.hash == '#openMuscarinicoBloqueado') {
    location.hash = '#close';
  }
}

$(".close").click(function(){
  location.hash = '#close';
});

var modalBB = document.querySelector('#openBetaBasal');
var modalBA = document.querySelector('#openBetaAtivado');
var modalBPA = document.querySelector('#openBetaParcialmenteAtivado');
var modalBBL = document.querySelector('#openBetaBloqueado');

modalBB.addEventListener('click', function(e) {
  modalClose();
}, false);

modalBA.addEventListener('click', function(e) {
  modalClose();
}, false);

modalBPA.addEventListener('click', function(e) {
  modalClose();
}, false);

modalBBL.addEventListener('click', function(e) {
  modalClose();
}, false);

modalBB.children[0].addEventListener('click', function(e){
  e.stopPropagation();
}, false);

modalBA.children[0].addEventListener('click', function(e){
  e.stopPropagation();
}, false);

modalBPA.children[0].addEventListener('click', function(e){
  e.stopPropagation();
}, false);

modalBBL.children[0].addEventListener('click', function(e){
  e.stopPropagation();
}, false);

var modalAB = document.querySelector('#openAlfaBasal');
var modalAA = document.querySelector('#openAlfaAtivado');
var modalAPA = document.querySelector('#openAlfaParcialmenteAtivado');
var modalABL = document.querySelector('#openAlfaBloqueado');

modalAB.addEventListener('click', function(e) {
  modalClose();
}, false);

modalAA.addEventListener('click', function(e) {
  modalClose();
}, false);

modalAPA.addEventListener('click', function(e) {
  modalClose();
}, false);

modalABL.addEventListener('click', function(e) {
  modalClose();
}, false);

modalAB.children[0].addEventListener('click', function(e){
  e.stopPropagation();
}, false);

modalAA.children[0].addEventListener('click', function(e){
  e.stopPropagation();
}, false);

modalAPA.children[0].addEventListener('click', function(e){
  e.stopPropagation();
}, false);

modalABL.children[0].addEventListener('click', function(e){
  e.stopPropagation();
}, false);

var modalMB = document.querySelector('#openMuscarinicoBasal');
var modalMA = document.querySelector('#openMuscarinicoAtivado');
var modalMPA = document.querySelector('#openMuscarinicoParcialmenteAtivado');
var modalMBL = document.querySelector('#openMuscarinicoBloqueado');

modalMB.addEventListener('click', function(e) {
  modalClose();
}, false);

modalMA.addEventListener('click', function(e) {
  modalClose();
}, false);

modalMPA.addEventListener('click', function(e) {
  modalClose();
}, false);

modalMBL.addEventListener('click', function(e) {
  modalClose();
}, false);

modalMB.children[0].addEventListener('click', function(e){
  e.stopPropagation();
}, false);

modalMA.children[0].addEventListener('click', function(e){
  e.stopPropagation();
}, false);

modalMPA.children[0].addEventListener('click', function(e){
  e.stopPropagation();
}, false);

modalMBL.children[0].addEventListener('click', function(e){
  e.stopPropagation();
}, false);

/*  */
function Desc(){
  var droga
  droga = document.getElementById('drogas').value

  var detail
  detail = document.getElementById('detail').value
 
  switch(droga){
    case 'Nenhuma':
      document.querySelector('#glandulasSalivares').src = '../assets/images/simulador-glandulas/images-gif/glandula-salivar-basal.png'
      document.querySelector('#receptorSA1').src = '../assets/images/simulador-glandulas/receptores/alfa2-basal.png'
      document.querySelector('#receptorSA2').src = '../assets/images/simulador-glandulas/receptores/m3-basal.png'
      document.querySelector('#glandulasSudoriparas').src = '../assets/images/simulador-glandulas/images-gif/glandula-sudoripara-basal.png'
      document.querySelector('#receptorSU1').src = '../assets/images/simulador-glandulas/receptores/m3-basal.png'
      document.querySelector('#adrenais').src = '../assets/images/simulador-glandulas/images-gif/rim-basal.gif'
      document.querySelector('#receptorA1').src = '../assets/images/simulador-glandulas/receptores/nicotinico-basal.png'

      switch(detail){
        case 'Efeitos':
          document.getElementById('detailarea').value = 'Nenhum fármaco selecionado'
        break;
      }
    break;

    case 'Noradrenalina':
      document.querySelector('#glandulasSalivares').src = '../assets/images/simulador-glandulas/images-gif/glandula-salivar-simpatico.png'
      document.querySelector('#receptorSA1').src = '../assets/images/simulador-glandulas/receptores/alfa2-ativado.png'
      document.querySelector('#receptorSA2').src = '../assets/images/simulador-glandulas/receptores/m3-basal.png'
      document.querySelector('#glandulasSudoriparas').src = '../assets/images/simulador-glandulas/images-gif/glandula-sudoripara-simpatico.gif'
      document.querySelector('#receptorSU1').src = '../assets/images/simulador-glandulas/receptores/m3-ativado.png'
      document.querySelector('#adrenais').src = '../assets/images/simulador-glandulas/images-gif/rim-simpatico.gif'
      document.querySelector('#receptorA1').src = '../assets/images/simulador-glandulas/receptores/nicotinico-ativado.png'

        switch(detail){
          case 'Efeitos':
            document.getElementById('detailarea').value = 'Diminuição da secreção salivar (mucosa), secreção das glândulas sudoríparas e secreta catecolaminas (adrenalina e noradrenalina) via estímulo do neurônio pré-ganglionar simpático que libera acetilcolina e ativa receptores nicotínicos.'
          break;
        }
    break;

    case 'Aceticolina':
      document.querySelector('#glandulasSalivares').src = '../assets/images/simulador-glandulas/images-gif/glandula-salivar-parassimpatico.png'
      document.querySelector('#receptorSA1').src = '../assets/images/simulador-glandulas/receptores/alfa2-basal.png'
      document.querySelector('#receptorSA2').src = '../assets/images/simulador-glandulas/receptores/m3-ativado.png'
      document.querySelector('#glandulasSudoriparas').src = '../assets/images/simulador-glandulas/images-gif/glandula-sudoripara-parassimpatico.png'
      document.querySelector('#receptorSU1').src = '../assets/images/simulador-glandulas/receptores/m3-basal.png'
      document.querySelector('#adrenais').src = '../assets/images/simulador-glandulas/images-gif/rim-parassimpatico.gif'
      document.querySelector('#receptorA1').src = '../assets/images/simulador-glandulas/receptores/nicotinico-basal.png'

        switch(detail){
          case 'Efeitos':
            document.getElementById('detailarea').value = 'Aumento da secreção salivar (aquosa).'
          break;
        }
    break;
  }  

}