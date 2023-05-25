<script setup>
// import { ref, watch } from 'vue';
import { useRoute,useRouter } from 'vue-router';
import { computed } from 'vue';
import Editor from 'primevue/editor';
import { ref,onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import LessonService from '@/service/LessonService.js';
import ProgressSpinner from 'primevue/progressspinner';
import { useStore } from 'vuex';
const route = useRoute();
const store = useStore();
const toast = useToast();
const router = useRouter();
const icons = ref(
     [{ name: "fa-align-left", code: "fa-align-left" },{ name: "fa-align-right", code: "fa-align-right" },{ name: "fa-amazon", code: "fa-amazon" },{ name: "fa-ambulance", code: "fa-ambulance" },{ name: "fa-anchor", code: "fa-anchor" },{ name: "fa-android", code: "fa-android" },{ name: "fa-angellist", code: "fa-angellist" },{ name: "fa-angle-double-down", code: "fa-angle-double-down" },{ name: "fa-angle-double-left", code: "fa-angle-double-left" },{ name: "fa-angle-double-right", code: "fa-angle-double-right" },{ name: "fa-angle-double-up", code: "fa-angle-double-up" },{ name: "fa-angle-left", code: "fa-angle-left" },{ name: "fa-angle-right", code: "fa-angle-right" },{ name: "fa-angle-up", code: "fa-angle-up" },{ name: "fa-apple", code: "fa-apple" },{ name: "fa-archive", code: "fa-archive" },{ name: "fa-area-chart", code: "fa-area-chart" },{ name: "fa-arrow-circle-down", code: "fa-arrow-circle-down" },{ name: "fa-arrow-circle-left", code: "fa-arrow-circle-left" },{ name: "fa-arrow-circle-o-down", code: "fa-arrow-circle-o-down" },{ name: "fa-arrow-circle-o-left", code: "fa-arrow-circle-o-left" },{ name: "fa-arrow-circle-o-right", code: "fa-arrow-circle-o-right" },{ name: "fa-arrow-circle-o-up", code: "fa-arrow-circle-o-up" },{ name: "fa-arrow-circle-right", code: "fa-arrow-circle-right" },{ name: "fa-arrow-circle-up", code: "fa-arrow-circle-up" },{ name: "fa-arrow-down", code: "fa-arrow-down" },{ name: "fa-arrow-left", code: "fa-arrow-left" },{ name: "fa-arrow-right", code: "fa-arrow-right" },{ name: "fa-arrow-up", code: "fa-arrow-up" },{ name: "fa-arrows", code: "fa-arrows" },{ name: "fa-arrows-alt", code: "fa-arrows-alt" },{ name: "fa-arrows-h", code: "fa-arrows-h" },{ name: "fa-arrows-v", code: "fa-arrows-v" },{ name: "fa-asterisk", code: "fa-asterisk" },{ name: "fa-at", code: "fa-at" },{ name: "fa-automobile", code: "fa-automobile" },{ name: "fa-backward", code: "fa-backward" },{ name: "fa-balance-scale", code: "fa-balance-scale" },{ name: "fa-ban", code: "fa-ban" },{ name: "fa-bank", code: "fa-bank" },{ name: "fa-bar-chart", code: "fa-bar-chart" },{ name: "fa-bar-chart-o", code: "fa-bar-chart-o" },{ name: "fa-battery-full", code: "fa-battery-full" },{ name: "fa-beer", code: "fa-beer" },{ name: "fa-behance", code: "fa-behance" },{ name: "fa-behance-square", code: "fa-behance-square" },{ name: "fa-bell", code: "fa-bell" },{ name: "fa-bell-o", code: "fa-bell-o" },{ name: "fa-bell-slash", code: "fa-bell-slash" },{ name: "fa-bell-slash-o", code: "fa-bell-slash-o" },{ name: "fa-bicycle", code: "fa-bicycle" },{ name: "fa-binoculars", code: "fa-binoculars" },{ name: "fa-birthday-cake", code: "fa-birthday-cake" },{ name: "fa-bitbucket", code: "fa-bitbucket" },{ name: "fa-bitbucket-square", code: "fa-bitbucket-square" },{ name: "fa-bitcoin", code: "fa-bitcoin" },{ name: "fa-black-tie", code: "fa-black-tie" },{ name: "fa-bold", code: "fa-bold" },{ name: "fa-bolt", code: "fa-bolt" },{ name: "fa-bomb", code: "fa-bomb" },{ name: "fa-book", code: "fa-book" },{ name: "fa-bookmark", code: "fa-bookmark" },{ name: "fa-bookmark-o", code: "fa-bookmark-o" },{ name: "fa-briefcase", code: "fa-briefcase" },{ name: "fa-btc", code: "fa-btc" },{ name: "fa-bug", code: "fa-bug" },{ name: "fa-building", code: "fa-building" },{ name: "fa-building-o", code: "fa-building-o" },{ name: "fa-bullhorn", code: "fa-bullhorn" },{ name: "fa-bullseye", code: "fa-bullseye" },{ name: "fa-bus", code: "fa-bus" },{ name: "fa-cab", code: "fa-cab" },{ name: "fa-calendar", code: "fa-calendar" },{ name: "fa-camera", code: "fa-camera" },{ name: "fa-car", code: "fa-car" },{ name: "fa-caret-up", code: "fa-caret-up" },{ name: "fa-cart-plus", code: "fa-cart-plus" },{ name: "fa-cc", code: "fa-cc" },{ name: "fa-cc-amex", code: "fa-cc-amex" },{ name: "fa-cc-jcb", code: "fa-cc-jcb" },{ name: "fa-cc-paypal", code: "fa-cc-paypal" },{ name: "fa-cc-stripe", code: "fa-cc-stripe" },{ name: "fa-cc-visa", code: "fa-cc-visa" },{ name: "fa-chain", code: "fa-chain" },{ name: "fa-check", code: "fa-check" },{ name: "fa-chevron-left", code: "fa-chevron-left" },{ name: "fa-chevron-right", code: "fa-chevron-right" },{ name: "fa-chevron-up", code: "fa-chevron-up" },{ name: "fa-child", code: "fa-child" },{ name: "fa-chrome", code: "fa-chrome" },{ name: "fa-circle", code: "fa-circle" },{ name: "fa-circle-o", code: "fa-circle-o" },{ name: "fa-circle-o-notch", code: "fa-circle-o-notch" },{ name: "fa-circle-thin", code: "fa-circle-thin" },{ name: "fa-clipboard", code: "fa-clipboard" },{ name: "fa-clock-o", code: "fa-clock-o" },{ name: "fa-clone", code: "fa-clone" },{ name: "fa-close", code: "fa-close" },{ name: "fa-cloud", code: "fa-cloud" },{ name: "fa-cloud-download", code: "fa-cloud-download" },{ name: "fa-cloud-upload", code: "fa-cloud-upload" },{ name: "fa-cny", code: "fa-cny" },{ name: "fa-code", code: "fa-code" },{ name: "fa-code-fork", code: "fa-code-fork" },{ name: "fa-codepen", code: "fa-codepen" },{ name: "fa-coffee", code: "fa-coffee" },{ name: "fa-cog", code: "fa-cog" },{ name: "fa-cogs", code: "fa-cogs" },{ name: "fa-columns", code: "fa-columns" },{ name: "fa-comment", code: "fa-comment" },{ name: "fa-comment-o", code: "fa-comment-o" },{ name: "fa-commenting", code: "fa-commenting" },{ name: "fa-commenting-o", code: "fa-commenting-o" },{ name: "fa-comments", code: "fa-comments" },{ name: "fa-comments-o", code: "fa-comments-o" },{ name: "fa-compass", code: "fa-compass" },{ name: "fa-compress", code: "fa-compress" },{ name: "fa-connectdevelop", code: "fa-connectdevelop" },{ name: "fa-contao", code: "fa-contao" },{ name: "fa-copy", code: "fa-copy" },{ name: "fa-copyright", code: "fa-copyright" },{ name: "fa-creative-commons", code: "fa-creative-commons" },{ name: "fa-credit-card", code: "fa-credit-card" },{ name: "fa-crop", code: "fa-crop" },{ name: "fa-crosshairs", code: "fa-crosshairs" },{ name: "fa-css3", code: "fa-css3" },{ name: "fa-cube", code: "fa-cube" },{ name: "fa-cubes", code: "fa-cubes" },{ name: "fa-cut", code: "fa-cut" },{ name: "fa-cutlery", code: "fa-cutlery" },{ name: "fa-dashboard", code: "fa-dashboard" },{ name: "fa-dashcube", code: "fa-dashcube" },{ name: "fa-database", code: "fa-database" },{ name: "fa-dedent", code: "fa-dedent" },{ name: "fa-delicious", code: "fa-delicious" },{ name: "fa-desktop", code: "fa-desktop" },{ name: "fa-deviantart", code: "fa-deviantart" },{ name: "fa-diamond", code: "fa-diamond" },{ name: "fa-digg", code: "fa-digg" },{ name: "fa-dollar", code: "fa-dollar" },{ name: "fa-download", code: "fa-download" },{ name: "fa-dribbble", code: "fa-dribbble" },{ name: "fa-dropbox", code: "fa-dropbox" },{ name: "fa-drupal", code: "fa-drupal" },{ name: "fa-edit", code: "fa-edit" },{ name: "fa-eject", code: "fa-eject" },{ name: "fa-ellipsis-h", code: "fa-ellipsis-h" },{ name: "fa-ellipsis-v", code: "fa-ellipsis-v" },{ name: "fa-empire", code: "fa-empire" },{ name: "fa-envelope", code: "fa-envelope" },{ name: "fa-envelope-o", code: "fa-envelope-o" },{ name: "fa-eur", code: "fa-eur" },{ name: "fa-euro", code: "fa-euro" },{ name: "fa-exchange", code: "fa-exchange" },{ name: "fa-exclamation", code: "fa-exclamation" },{ name: "fa-exclamation-circle", code: "fa-exclamation-circle" },{ name: "fa-exclamation-triangle", code: "fa-exclamation-triangle" },{ name: "fa-expand", code: "fa-expand" },{ name: "fa-expeditedssl", code: "fa-expeditedssl" },{ name: "fa-external-link", code: "fa-external-link" },{ name: "fa-external-link-square", code: "fa-external-link-square" },{ name: "fa-eye", code: "fa-eye" },{ name: "fa-eye-slash", code: "fa-eye-slash" },{ name: "fa-eyedropper", code: "fa-eyedropper" },{ name: "fa-facebook", code: "fa-facebook" },{ name: "fa-facebook-f", code: "fa-facebook-f" },{ name: "fa-facebook-official", code: "fa-facebook-official" },{ name: "fa-facebook-square", code: "fa-facebook-square" },{ name: "fa-fast-backward", code: "fa-fast-backward" },{ name: "fa-fast-forward", code: "fa-fast-forward" },{ name: "fa-fax", code: "fa-fax" },{ name: "fa-feed", code: "fa-feed" },{ name: "fa-female", code: "fa-female" },{ name: "fa-fighter-jet", code: "fa-fighter-jet" },{ name: "fa-file", code: "fa-file" },{ name: "fa-file-archive-o", code: "fa-file-archive-o" },{ name: "fa-file-audio-o", code: "fa-file-audio-o" },{ name: "fa-file-code-o", code: "fa-file-code-o" },{ name: "fa-file-excel-o", code: "fa-file-excel-o" },{ name: "fa-file-image-o", code: "fa-file-image-o" },{ name: "fa-file-movie-o", code: "fa-file-movie-o" },{ name: "fa-file-o", code: "fa-file-o" },{ name: "fa-file-pdf-o", code: "fa-file-pdf-o" },{ name: "fa-file-photo-o", code: "fa-file-photo-o" },{ name: "fa-file-picture-o", code: "fa-file-picture-o" },{ name: "fa-file-powerpoint-o", code: "fa-file-powerpoint-o" },{ name: "fa-file-sound-o", code: "fa-file-sound-o" },{ name: "fa-file-text", code: "fa-file-text" },{ name: "fa-file-text-o", code: "fa-file-text-o" },{ name: "fa-file-video-o", code: "fa-file-video-o" },{ name: "fa-file-word-o", code: "fa-file-word-o" },{ name: "fa-file-zip-o", code: "fa-file-zip-o" },{ name: "fa-files-o", code: "fa-files-o" },{ name: "fa-film", code: "fa-film" },{ name: "fa-filter", code: "fa-filter" },{ name: "fa-fire", code: "fa-fire" },{ name: "fa-fire-extinguisher", code: "fa-fire-extinguisher" },{ name: "fa-firefox", code: "fa-firefox" },{ name: "fa-flag", code: "fa-flag" },{ name: "fa-flag-checkered", code: "fa-flag-checkered" },{ name: "fa-flag-o", code: "fa-flag-o" },{ name: "fa-flash", code: "fa-flash" },{ name: "fa-flask", code: "fa-flask" },{ name: "fa-flickr", code: "fa-flickr" },{ name: "fa-floppy-o", code: "fa-floppy-o" },{ name: "fa-folder", code: "fa-folder" },{ name: "fa-folder-o", code: "fa-folder-o" },{ name: "fa-folder-open", code: "fa-folder-open" },{ name: "fa-folder-open-o", code: "fa-folder-open-o" },{ name: "fa-font", code: "fa-font" },{ name: "fa-fonticons", code: "fa-fonticons" },{ name: "fa-forumbee", code: "fa-forumbee" },{ name: "fa-forward", code: "fa-forward" },{ name: "fa-foursquare", code: "fa-foursquare" },{ name: "fa-frown-o", code: "fa-frown-o" },{ name: "fa-futbol-o", code: "fa-futbol-o" },{ name: "fa-gamepad", code: "fa-gamepad" },{ name: "fa-gavel", code: "fa-gavel" },{ name: "fa-gbp", code: "fa-gbp" },{ name: "fa-ge", code: "fa-ge" },{ name: "fa-gear", code: "fa-gear" },{ name: "fa-gears", code: "fa-gears" },{ name: "fa-genderless", code: "fa-genderless" },{ name: "fa-get-pocket", code: "fa-get-pocket" },{ name: "fa-gg", code: "fa-gg" },{ name: "fa-gg-circle", code: "fa-gg-circle" },{ name: "fa-gift", code: "fa-gift" },{ name: "fa-git", code: "fa-git" },{ name: "fa-git-square", code: "fa-git-square" },{ name: "fa-github", code: "fa-github" },{ name: "fa-github-alt", code: "fa-github-alt" },{ name: "fa-github-square", code: "fa-github-square" },{ name: "fa-gittip", code: "fa-gittip" },{ name: "fa-glass", code: "fa-glass" },{ name: "fa-globe", code: "fa-globe" },{ name: "fa-google", code: "fa-google" },{ name: "fa-google-plus", code: "fa-google-plus" },{ name: "fa-google-plus-square", code: "fa-google-plus-square" },{ name: "fa-google-wallet", code: "fa-google-wallet" },{ name: "fa-graduation-cap", code: "fa-graduation-cap" },{ name: "fa-gratipay", code: "fa-gratipay" },{ name: "fa-group", code: "fa-group" },{ name: "fa-h-square", code: "fa-h-square" },{ name: "fa-hacker-news", code: "fa-hacker-news" },{ name: "fa-hand-grab-o", code: "fa-hand-grab-o" },{ name: "fa-hand-lizard-o", code: "fa-hand-lizard-o" },{ name: "fa-hand-o-down", code: "fa-hand-o-down" },{ name: "fa-hand-o-left", code: "fa-hand-o-left" },{ name: "fa-hand-o-right", code: "fa-hand-o-right" },{ name: "fa-hand-o-up", code: "fa-hand-o-up" },{ name: "fa-hand-paper-o", code: "fa-hand-paper-o" },{ name: "fa-hand-peace-o", code: "fa-hand-peace-o" },{ name: "fa-hand-pointer-o", code: "fa-hand-pointer-o" },{ name: "fa-hand-rock-o", code: "fa-hand-rock-o" },{ name: "fa-hand-scissors-o", code: "fa-hand-scissors-o" },{ name: "fa-hand-spock-o", code: "fa-hand-spock-o" },{ name: "fa-hand-stop-o", code: "fa-hand-stop-o" },{ name: "fa-hdd-o", code: "fa-hdd-o" },{ name: "fa-header", code: "fa-header" },{ name: "fa-headphones", code: "fa-headphones" },{ name: "fa-heart", code: "fa-heart" },{ name: "fa-heart-o", code: "fa-heart-o" },{ name: "fa-heartbeat", code: "fa-heartbeat" },{ name: "fa-history", code: "fa-history" },{ name: "fa-home", code: "fa-home" },{ name: "fa-hospital-o", code: "fa-hospital-o" },{ name: "fa-hotel", code: "fa-hotel" },{ name: "fa-hourglass", code: "fa-hourglass" },{ name: "fa-hourglass-1", code: "fa-hourglass-1" },{ name: "fa-hourglass-2", code: "fa-hourglass-2" },{ name: "fa-hourglass-3", code: "fa-hourglass-3" },{ name: "fa-hourglass-end", code: "fa-hourglass-end" },{ name: "fa-hourglass-half", code: "fa-hourglass-half" },{ name: "fa-hourglass-o", code: "fa-hourglass-o" },{ name: "fa-hourglass-start", code: "fa-hourglass-start" },{ name: "fa-houzz", code: "fa-houzz" },{ name: "fa-html5", code: "fa-html5" },{ name: "fa-i-cursor", code: "fa-i-cursor" },{ name: "fa-ils", code: "fa-ils" },{ name: "fa-image", code: "fa-image" },{ name: "fa-inbox", code: "fa-inbox" },{ name: "fa-indent", code: "fa-indent" },{ name: "fa-industry", code: "fa-industry" },{ name: "fa-info", code: "fa-info" },{ name: "fa-info-circle", code: "fa-info-circle" },{ name: "fa-inr", code: "fa-inr" },{ name: "fa-instagram", code: "fa-instagram" },{ name: "fa-institution", code: "fa-institution" },{ name: "fa-internet-explorer", code: "fa-internet-explorer" },{ name: "fa-intersex", code: "fa-intersex" },{ name: "fa-ioxhost", code: "fa-ioxhost" },{ name: "fa-italic", code: "fa-italic" },{ name: "fa-joomla", code: "fa-joomla" },{ name: "fa-jpy", code: "fa-jpy" },{ name: "fa-jsfiddle", code: "fa-jsfiddle" },{ name: "fa-key", code: "fa-key" },{ name: "fa-keyboard-o", code: "fa-keyboard-o" },{ name: "fa-krw", code: "fa-krw" },{ name: "fa-language", code: "fa-language" },{ name: "fa-laptop", code: "fa-laptop" },{ name: "fa-lastfm", code: "fa-lastfm" },{ name: "fa-lastfm-square", code: "fa-lastfm-square" },{ name: "fa-leaf", code: "fa-leaf" },{ name: "fa-leanpub", code: "fa-leanpub" },{ name: "fa-legal", code: "fa-legal" },{ name: "fa-lemon-o", code: "fa-lemon-o" },{ name: "fa-level-down", code: "fa-level-down" },{ name: "fa-level-up", code: "fa-level-up" },{ name: "fa-life-bouy", code: "fa-life-bouy" },{ name: "fa-life-buoy", code: "fa-life-buoy" },{ name: "fa-life-ring", code: "fa-life-ring" },{ name: "fa-life-saver", code: "fa-life-saver" },{ name: "fa-lightbulb-o", code: "fa-lightbulb-o" },{ name: "fa-line-chart", code: "fa-line-chart" },{ name: "fa-link", code: "fa-link" },{ name: "fa-linkedin", code: "fa-linkedin" },{ name: "fa-linkedin-square", code: "fa-linkedin-square" },{ name: "fa-linux", code: "fa-linux" },{ name: "fa-list", code: "fa-list" },{ name: "fa-list-alt", code: "fa-list-alt" },{ name: "fa-list-ol", code: "fa-list-ol" },{ name: "fa-list-ul", code: "fa-list-ul" },{ name: "fa-location-arrow", code: "fa-location-arrow" },{ name: "fa-lock", code: "fa-lock" },{ name: "fa-long-arrow-down", code: "fa-long-arrow-down" },{ name: "fa-long-arrow-left", code: "fa-long-arrow-left" },{ name: "fa-long-arrow-right", code: "fa-long-arrow-right" },{ name: "fa-long-arrow-up", code: "fa-long-arrow-up" },{ name: "fa-magic", code: "fa-magic" },{ name: "fa-magnet", code: "fa-magnet" },{ name: "fa-mars-stroke-v", code: "fa-mars-stroke-v" },{ name: "fa-maxcdn", code: "fa-maxcdn" },{ name: "fa-meanpath", code: "fa-meanpath" },{ name: "fa-medium", code: "fa-medium" },{ name: "fa-medkit", code: "fa-medkit" },{ name: "fa-meh-o", code: "fa-meh-o" },{ name: "fa-mercury", code: "fa-mercury" },{ name: "fa-microphone", code: "fa-microphone" },{ name: "fa-mobile", code: "fa-mobile" },{ name: "fa-motorcycle", code: "fa-motorcycle" },{ name: "fa-mouse-pointer", code: "fa-mouse-pointer" },{ name: "fa-music", code: "fa-music" },{ name: "fa-navicon", code: "fa-navicon" },{ name: "fa-neuter", code: "fa-neuter" },{ name: "fa-newspaper-o", code: "fa-newspaper-o" },{ name: "fa-opencart", code: "fa-opencart" },{ name: "fa-openid", code: "fa-openid" },{ name: "fa-opera", code: "fa-opera" },{ name: "fa-outdent", code: "fa-outdent" },{ name: "fa-pagelines", code: "fa-pagelines" },{ name: "fa-paper-plane-o", code: "fa-paper-plane-o" },{ name: "fa-paperclip", code: "fa-paperclip" },{ name: "fa-paragraph", code: "fa-paragraph" },{ name: "fa-paste", code: "fa-paste" },{ name: "fa-pause", code: "fa-pause" },{ name: "fa-paw", code: "fa-paw" },{ name: "fa-paypal", code: "fa-paypal" },{ name: "fa-pencil", code: "fa-pencil" },{ name: "fa-pencil-square-o", code: "fa-pencil-square-o" },{ name: "fa-phone", code: "fa-phone" },{ name: "fa-photo", code: "fa-photo" },{ name: "fa-picture-o", code: "fa-picture-o" },{ name: "fa-pie-chart", code: "fa-pie-chart" },{ name: "fa-pied-piper", code: "fa-pied-piper" },{ name: "fa-pied-piper-alt", code: "fa-pied-piper-alt" },{ name: "fa-pinterest", code: "fa-pinterest" },{ name: "fa-pinterest-p", code: "fa-pinterest-p" },{ name: "fa-pinterest-square", code: "fa-pinterest-square" },{ name: "fa-plane", code: "fa-plane" },{ name: "fa-play", code: "fa-play" },{ name: "fa-play-circle", code: "fa-play-circle" },{ name: "fa-play-circle-o", code: "fa-play-circle-o" },{ name: "fa-plug", code: "fa-plug" },{ name: "fa-plus", code: "fa-plus" },{ name: "fa-plus-circle", code: "fa-plus-circle" },{ name: "fa-plus-square", code: "fa-plus-square" },{ name: "fa-plus-square-o", code: "fa-plus-square-o" },{ name: "fa-power-off", code: "fa-power-off" },{ name: "fa-print", code: "fa-print" },{ name: "fa-puzzle-piece", code: "fa-puzzle-piece" },{ name: "fa-qq", code: "fa-qq" },{ name: "fa-qrcode", code: "fa-qrcode" },{ name: "fa-question", code: "fa-question" },{ name: "fa-question-circle", code: "fa-question-circle" },{ name: "fa-quote-left", code: "fa-quote-left" },{ name: "fa-quote-right", code: "fa-quote-right" },{ name: "fa-ra", code: "fa-ra" },{ name: "fa-random", code: "fa-random" },{ name: "fa-rebel", code: "fa-rebel" },{ name: "fa-recycle", code: "fa-recycle" },{ name: "fa-reddit", code: "fa-reddit" },{ name: "fa-reddit-square", code: "fa-reddit-square" },{ name: "fa-refresh", code: "fa-refresh" },{ name: "fa-registered", code: "fa-registered" },{ name: "fa-remove", code: "fa-remove" },{ name: "fa-renren", code: "fa-renren" },{ name: "fa-reorder", code: "fa-reorder" },{ name: "fa-repeat", code: "fa-repeat" },{ name: "fa-reply", code: "fa-reply" },{ name: "fa-reply-all", code: "fa-reply-all" },{ name: "fa-retweet", code: "fa-retweet" },{ name: "fa-rmb", code: "fa-rmb" },{ name: "fa-road", code: "fa-road" },{ name: "fa-rocket", code: "fa-rocket" },{ name: "fa-rotate-left", code: "fa-rotate-left" },{ name: "fa-rotate-right", code: "fa-rotate-right" },{ name: "fa-rouble", code: "fa-rouble" },{ name: "fa-rss", code: "fa-rss" },{ name: "fa-rss-square", code: "fa-rss-square" },{ name: "fa-rub", code: "fa-rub" },{ name: "fa-ruble", code: "fa-ruble" },{ name: "fa-rupee", code: "fa-rupee" },{ name: "fa-safari", code: "fa-safari" },{ name: "fa-sliders", code: "fa-sliders" },{ name: "fa-slideshare", code: "fa-slideshare" },{ name: "fa-smile-o", code: "fa-smile-o" },{ name: "fa-sort-asc", code: "fa-sort-asc" },{ name: "fa-sort-desc", code: "fa-sort-desc" },{ name: "fa-sort-down", code: "fa-sort-down" },{ name: "fa-spinner", code: "fa-spinner" },{ name: "fa-spoon", code: "fa-spoon" },{ name: "fa-spotify", code: "fa-spotify" },{ name: "fa-square", code: "fa-square" },{ name: "fa-square-o", code: "fa-square-o" },{ name: "fa-star", code: "fa-star" },{ name: "fa-star-half", code: "fa-star-half" },{ name: "fa-stop", code: "fa-stop" },{ name: "fa-subscript", code: "fa-subscript" },{ name: "fa-tablet", code: "fa-tablet" },{ name: "fa-tachometer", code: "fa-tachometer" },{ name: "fa-tag", code: "fa-tag" },{ name: "fa-tags", code: "fa-tags" }]
);

const lessons = computed(() =>  store.state.lessons )
let lessonId = route.query.lessonId;
let chapterId = route.query.chapterId;
let edit = route.query.edit;
var mcqs = ref([{ question : '',answerOptions:[]}]);
const selectedCountry = ref();
const pageTitle = ref('Add a new lesson');
const loading = ref(true); 
const countries = ref([
    { name: 'Australia', code: 'AU' },
    { name: 'Brazil', code: 'BR' },
    { name: 'China', code: 'CN' },
    { name: 'Egypt', code: 'EG' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'India', code: 'IN' },
    { name: 'Japan', code: 'JP' },
    { name: 'Spain', code: 'ES' },
    { name: 'United States', code: 'US' }
]);

const lesson = ref({status:1,chapter_id:chapterId});

let isImgUrl = (url) => {
  return /\.(jpg|jpeg|png|webp|avif|gif)$/.test(url)
}

// import { useLayout } from '@/layout/composables/layout';
const lessonService = new LessonService();
onMounted(()=>{
    if(edit){
        pageTitle.value = "Edit lesson"
        lessonService.getLesson(lessonId).then((data) => { 
            lesson.value = data.data; 
            // console.log(data.data.lessonimage); 
            // if(data.data.lessonimage){
            //     const lessonImgVar = fetch(data.data.lessonimage,{mode:'no-cors'})
            //     const blob = lessonImgVar.blob()
            //     const lessonImg = new File([blob], media.file_name, { type: '' })
            // }
            loading.value=false
        });

        // console.log(lesson.value)
        // const response = fetch(media.original_url)
        // const blob = response.blob()
        // this.filledMetas[startprop].meta[mainprop][innerprop][innerpropvalue] = new File([blob], media.file_name, { type: 'image/*' })
    }else
    {
        loading.value=false
    }
})

// action methods
const handleQuestionType = (event) => {
    // if(event.target.value == 'mcqs')
    // {
    //     question.mcqs = []
    // }
}
const addMoreQuestion = () => {
    let inx  = mcqs.value.length;
    mcqs.value[inx] = { lesson : '',answerOptions:[]};
    console.log(mcqs.value);
}

const saveLesson = () => {
    if(lessonId){
        lessonService.updateLesson(lessonId,lesson.value)
        .then((data) => { 
            loading.value=false;  
            toast.add({ severity: 'success', summary: 'Updated', detail: 'Lesson has been updated Successfully.', life: 3000 });
            router.push(`/chapters/${chapterId}/lessons`);
        });
    }else{
        lessonService.addLesson(lesson.value).then((response) => { 
            toast.add({ severity: 'success', summary: 'Added', detail: 'Lesson has been added Successfully.', life: 3000 })
            router.push(`/chapters/${chapterId}/lessons`);
            // router.push({path: '/add-lesson',query: {chapterId:chapterId}})
        })
     }
};

const deletMedia = (id) => {
    lessonService.deleteMediaItem(id).then((response) => { 
        lesson.value.lessonimage = '';
        toast.add({ severity: 'success', summary: 'Added', detail: 'Lesson has been added Successfully.', life: 3000 })
    })
}

const onAdvancedUpload = async (event) => {
    lesson.value.file = await event.files[0];
}
const removeFileFromQuestion = () => {
    lesson.value.file = null;
} 


// const { layoutConfig, layoutState, setActiveMenuItem, onMenuToggle } = useLayout();
</script>

<template>
    <div className="grid">
        <Toast />
        <div className="col-12">
            <div className="card">
              <ProgressBar v-if="loading" mode="indeterminate" style="height: 6px"></ProgressBar>
                <h4>{{pageTitle}}</h4>
                <form @submit.prevent="saveLesson" class="flex flex-column gap-2">
                <div class="grid">
                    <div class="col-8">
                        <div class="mb-3 gap-2 w-100">
                            <label for="username" class="p-sr-only">Title</label>
                            <InputText v-model="lesson.title" id="username" placeholder="Title" class="w-full" />
                        </div>
                        <div class="mb-3 gap-2 w-100 hidden">
                            <label for="Content" class="p-sr-only">Content</label>
                            <Textarea v-model="lesson.excerpt" id="Content" autoResize placeholder="Content" class="w-full" rows="6" cols="30" />
                        </div>
                        <div class="my-4 hidden">  
                        
                        <label class="block font-semibold text-900 text-lg mb-3 hidden" block>Question Type</label>
                        <div class="flex flex-wrap gap-3 hidden">
                            <div class="flex align-items-center">
                                <RadioButton v-model="lesson.type" inputId="ingredient1" name="pizza" value="confirmation" @change="handleQuestionType($event)"/>
                                <label for="ingredient1" class="ml-2">Confirmation</label>
                            </div>
                            <div class="flex align-items-center">
                                <RadioButton v-model="lesson.type" inputId="ingredient2" name="pizza" value="answer_and_reference" @change="handleQuestionType($event)"/>
                                <label for="ingredient2" class="ml-2">Answer and Reference</label>
                            </div>
                            <div class="flex align-items-center">
                                <RadioButton v-model="lesson.type" inputId="ingredient3" name="pizza" value="mcqs" @change="handleQuestionType($event)"/>
                                <label for="ingredient3" class="ml-2">Multiple Choice Questions</label>
                            </div>
                        </div>
                       </div>

                        <div class="mb-4 gap-2 w-100">
                            <Editor  v-model="lesson.description" editorStyle="height: 320px" />
                        </div>

                        <div class="mb-4 gap-2 w-100">
                            <label for="description">Icon</label>
                            <Dropdown  :options="icons" v-model.trim="lesson.icon" optionLabel="name" placeholder="Select an icon" class="w-full" filter >
                                <template #value="slotProps">
                                    <div v-if="slotProps.value" class="flex align-items-center">
                                        <div><i :class="'fa '+ slotProps.value.name"></i> {{ slotProps.value.name }}</div>
                                    </div>
                                    <span v-else>
                                        {{ slotProps.placeholder }}
                                    </span>
                                </template>
                                <template #option="slotProps">
                                    <div class="flex align-items-center">
                                        <span> <i :class="'fa '+ slotProps.option.name"></i> {{slotProps.option.name }}</span>
                                    </div>
                                </template>
                            </Dropdown>
                        </div>

                     <div class="flex gap-5">
                        <div class="mb-5 mt-4 gap-2 w-100">
                          <Checkbox v-model="lesson.multiple" inputId="multiple_lessons" name="multiple" value="1" :binary="true"/>
                          <label for="multiple_lessons" class="ml-2"> Have multiple lessons. </label>
                        </div>

                        <!-- <div class="mb-5 mt-4 gap-2 w-100">
                             <Checkbox v-model="lesson.is_inner_lesson" inputId="inner_lesson" name="multiple" value="1" />
                           <label for="inner_lesson" class="ml-2"> Inner Lesson. </label>
                        </div> -->
                    
                        <!-- <div class="mb-5 mt-4 gap-2 w-100" v-if="lesson.is_inner_lesson != ''">
                             <h6>Select lesson</h6>
                             <Dropdown v-model="lesson.lesson_id" :options="lessons.lessonsSelect" optionLabel="name" placeholder="Select a Lesson" class="w-full md:w-14rem">
                            </Dropdown>
                        </div> -->
                        </div>
                        
                        <div class="media-wrap relative mb-3" v-if="lesson.lessonimage">
                        <Button icon="pi pi-trash" class="p-button-rounded mr-2 mb-2 z-2 absolute right-0" @click="deletMedia(lessonId)"/>
                        
                        <img v-if="isImgUrl(lesson.lessonimage)" :src="lesson.lessonimage">
                        <video v-else width="320" height="240" class="w-full" controls>
                            <source :src="lesson.lessonimage" type="video/mp4">
                            <source :src="lesson.lessonimage" type="video/ogg">
                            Your browser does not support the video tag.
                        </video>
                        </div>
                        <FileUpload name="demo[]" :uploadedFiles="true" :showUploadButton="false" :showCancelButton="true" :fileLimit="1" @remove="removeFileFromQuestion()" @select="onAdvancedUpload($event)"  accept="" :maxFileSize="20000000">
                            <template #empty>
                                <p>Drag and drop files to here to upload.</p>
                            </template>
                        </FileUpload>

                        <div class="mcqs hidden">
                            <span class="block font-semibold text-900 text-lg mb-3 mt-4" block>Add Multiple Choice Questions</span>
                            <div class="grid">
                                <div class="col-12">
                                  <div class="mcqs_question" v-for="mcq in mcqs">
                                        <div class="mb-3">
                                        <label for="username" class="p-sr-only">Title</label>
                                        <InputText v-model="mcq.question" id="username" placeholder="Question" class="w-full" />
                                        </div>
                                        <div class="mb-3">
                                            <Chips v-model="mcq.answerOptions" placeholder="Answer Options" class="w-full" />
                                        </div>
                                        <Divider />
                                    </div>
                                    
                                    <button class="p-button p-component p-button-primary flex-1" type="button" aria-label="Publish" @click="addMoreQuestion()">
                                        <span class="pi pi-fw pi-check p-button-icon p-button-icon-left"></span>
                                        <span class="p-button-label">Add</span>
                                        <span class="p-ink" role="presentation" aria-hidden="true"></span>
                                    </button>

                                </div>
                            </div>
                        </div>
                </div>

                <div class="col-4">
                    <div class="border-1 surface-border border-round mb-4">
                    <span class="text-900 font-bold block border-bottom-1 surface-border p-3">Publish</span>
                    <div class="p-3">   
                        <div class="surface-100 p-3 flex align-items-center border-round">
                        <span class="text-900 font-semibold mr-3">Status:</span>
                        <span class="font-medium">Draft</span>
                        <button class="p-button p-component p-button-icon-only p-button-rounded p-button-text ml-auto" type="button">
                            <!---->
                            <span class="pi pi-fw pi-pencil p-button-icon"></span>
                            <span class="p-button-label">&nbsp;</span>
                            <!---->
                            <span class="p-ink" role="presentation" aria-hidden="true"></span>
                        </button>
                        </div>
                    </div>
                    <div class="p-3">
                        <div class="surface-100 p-3 flex align-items-center border-round">
                        <span class="text-900 font-semibold mr-3">Visibility:</span>
                        <span class="font-medium">Private</span>
                        <button class="p-button p-component p-button-icon-only p-button-rounded p-button-text ml-auto" type="button">
                            <!---->
                            <span class="pi pi-fw pi-pencil p-button-icon"></span>
                            <span class="p-button-label">&nbsp;</span>
                            <!---->
                            <span class="p-ink" role="presentation" aria-hidden="true"></span>
                        </button>
                        </div>
                    </div>
                    </div>

                    <!-- <div class="border-1 surface-border border-round mb-4">
                        <span class="text-900 font-bold block border-bottom-1 surface-border p-3">Tags</span>
                        <div class="p-3 flex gap-2">
                            <Dropdown v-model="selectedCountry" :options="countries" optionLabel="name" placeholder="Select a Country" class="w-full md:w-14rem">
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="flex align-items-center p-chip p-component">
                                    <div>{{ slotProps.value.name }}</div>
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                            </Dropdown>

                            <div class="p-chip p-component" aria-label="Software">
                             <div class="p-chip-text">Software</div>
                            </div>
                            <div class="p-chip p-component" aria-label="Web">
                            <div class="p-chip-text">Web</div>
                            </div>
                        </div>
                    </div> -->

                        <div class="flex justify-content-between gap-3">
                        <button class="p-button p-component p-button-danger flex-1 p-button-outlined" type="button" aria-label="Discard">
                            <!---->
                            <span class="pi pi-fw pi-trash p-button-icon p-button-icon-left"></span>
                            <span class="p-button-label">Discard</span>
                            <!---->
                            <span class="p-ink" role="presentation" aria-hidden="true"></span>
                        </button>

                        <button class="p-button p-component p-button-primary flex-1" type="submit" aria-label="Publish" >
                            <!---->
                            <span class="pi pi-fw pi-check p-button-icon p-button-icon-left"></span>
                            <span class="p-button-label" v-if="!route.query.lessonId">Publish</span>
                            <span class="p-button-label" v-else>Update</span>
                            <!---->
                            <span class="p-ink" role="presentation" aria-hidden="true"></span>
                        </button>
                        </div>
                    </div>
                </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style>
 .mcqs  .p-chips-multiple-container {
    width: 100%;
 }
 ul.p-inputtext.p-chips-multiple-container li {
    margin: 3px 0px;
}
.ql-editor h2 {
    margin-bottom: 12px;
}
.ql-editor p {
    margin-bottom: 11px;
}
</style>