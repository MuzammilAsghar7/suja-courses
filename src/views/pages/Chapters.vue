<script setup>
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount } from 'vue';
import ProductService from '@/service/ProductService';
import { useToast } from 'primevue/usetoast';
import { useLayout } from '@/layout/composables/layout';
import { useStore } from 'vuex';

// import axios from 'axios';
const toast = useToast();
const { contextPath } = useLayout();
const store = useStore();

const products = ref(null);
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const selectedProducts = ref(null);
const dt = ref(null);
const filters = ref({});
const submitted = ref(false);
const statuses = ref([
    { label: 'INSTOCK', value: 'instock' },
    { label: 'LOWSTOCK', value: 'lowstock' },
    { label: 'OUTOFSTOCK', value: 'outofstock' }
]);
const courseStatuses = ref([
    { label: 'ENABLE', value: "1" },
    { label: 'DISABLE', value: "0" },
]);

const modules = ref(null);
const courses = ref(null);
const icons = ref(
     [{ name: "fa-align-left", code: "fa-align-left" },{ name: "fa-align-right", code: "fa-align-right" },{ name: "fa-amazon", code: "fa-amazon" },{ name: "fa-ambulance", code: "fa-ambulance" },{ name: "fa-anchor", code: "fa-anchor" },{ name: "fa-android", code: "fa-android" },{ name: "fa-angellist", code: "fa-angellist" },{ name: "fa-angle-double-down", code: "fa-angle-double-down" },{ name: "fa-angle-double-left", code: "fa-angle-double-left" },{ name: "fa-angle-double-right", code: "fa-angle-double-right" },{ name: "fa-angle-double-up", code: "fa-angle-double-up" },{ name: "fa-angle-left", code: "fa-angle-left" },{ name: "fa-angle-right", code: "fa-angle-right" },{ name: "fa-angle-up", code: "fa-angle-up" },{ name: "fa-apple", code: "fa-apple" },{ name: "fa-archive", code: "fa-archive" },{ name: "fa-area-chart", code: "fa-area-chart" },{ name: "fa-arrow-circle-down", code: "fa-arrow-circle-down" },{ name: "fa-arrow-circle-left", code: "fa-arrow-circle-left" },{ name: "fa-arrow-circle-o-down", code: "fa-arrow-circle-o-down" },{ name: "fa-arrow-circle-o-left", code: "fa-arrow-circle-o-left" },{ name: "fa-arrow-circle-o-right", code: "fa-arrow-circle-o-right" },{ name: "fa-arrow-circle-o-up", code: "fa-arrow-circle-o-up" },{ name: "fa-arrow-circle-right", code: "fa-arrow-circle-right" },{ name: "fa-arrow-circle-up", code: "fa-arrow-circle-up" },{ name: "fa-arrow-down", code: "fa-arrow-down" },{ name: "fa-arrow-left", code: "fa-arrow-left" },{ name: "fa-arrow-right", code: "fa-arrow-right" },{ name: "fa-arrow-up", code: "fa-arrow-up" },{ name: "fa-arrows", code: "fa-arrows" },{ name: "fa-arrows-alt", code: "fa-arrows-alt" },{ name: "fa-arrows-h", code: "fa-arrows-h" },{ name: "fa-arrows-v", code: "fa-arrows-v" },{ name: "fa-asterisk", code: "fa-asterisk" },{ name: "fa-at", code: "fa-at" },{ name: "fa-automobile", code: "fa-automobile" },{ name: "fa-backward", code: "fa-backward" },{ name: "fa-balance-scale", code: "fa-balance-scale" },{ name: "fa-ban", code: "fa-ban" },{ name: "fa-bank", code: "fa-bank" },{ name: "fa-bar-chart", code: "fa-bar-chart" },{ name: "fa-bar-chart-o", code: "fa-bar-chart-o" },{ name: "fa-battery-full", code: "fa-battery-full" },{ name: "fa-beer", code: "fa-beer" },{ name: "fa-behance", code: "fa-behance" },{ name: "fa-behance-square", code: "fa-behance-square" },{ name: "fa-bell", code: "fa-bell" },{ name: "fa-bell-o", code: "fa-bell-o" },{ name: "fa-bell-slash", code: "fa-bell-slash" },{ name: "fa-bell-slash-o", code: "fa-bell-slash-o" },{ name: "fa-bicycle", code: "fa-bicycle" },{ name: "fa-binoculars", code: "fa-binoculars" },{ name: "fa-birthday-cake", code: "fa-birthday-cake" },{ name: "fa-bitbucket", code: "fa-bitbucket" },{ name: "fa-bitbucket-square", code: "fa-bitbucket-square" },{ name: "fa-bitcoin", code: "fa-bitcoin" },{ name: "fa-black-tie", code: "fa-black-tie" },{ name: "fa-bold", code: "fa-bold" },{ name: "fa-bolt", code: "fa-bolt" },{ name: "fa-bomb", code: "fa-bomb" },{ name: "fa-book", code: "fa-book" },{ name: "fa-bookmark", code: "fa-bookmark" },{ name: "fa-bookmark-o", code: "fa-bookmark-o" },{ name: "fa-briefcase", code: "fa-briefcase" },{ name: "fa-btc", code: "fa-btc" },{ name: "fa-bug", code: "fa-bug" },{ name: "fa-building", code: "fa-building" },{ name: "fa-building-o", code: "fa-building-o" },{ name: "fa-bullhorn", code: "fa-bullhorn" },{ name: "fa-bullseye", code: "fa-bullseye" },{ name: "fa-bus", code: "fa-bus" },{ name: "fa-cab", code: "fa-cab" },{ name: "fa-calendar", code: "fa-calendar" },{ name: "fa-camera", code: "fa-camera" },{ name: "fa-car", code: "fa-car" },{ name: "fa-caret-up", code: "fa-caret-up" },{ name: "fa-cart-plus", code: "fa-cart-plus" },{ name: "fa-cc", code: "fa-cc" },{ name: "fa-cc-amex", code: "fa-cc-amex" },{ name: "fa-cc-jcb", code: "fa-cc-jcb" },{ name: "fa-cc-paypal", code: "fa-cc-paypal" },{ name: "fa-cc-stripe", code: "fa-cc-stripe" },{ name: "fa-cc-visa", code: "fa-cc-visa" },{ name: "fa-chain", code: "fa-chain" },{ name: "fa-check", code: "fa-check" },{ name: "fa-chevron-left", code: "fa-chevron-left" },{ name: "fa-chevron-right", code: "fa-chevron-right" },{ name: "fa-chevron-up", code: "fa-chevron-up" },{ name: "fa-child", code: "fa-child" },{ name: "fa-chrome", code: "fa-chrome" },{ name: "fa-circle", code: "fa-circle" },{ name: "fa-circle-o", code: "fa-circle-o" },{ name: "fa-circle-o-notch", code: "fa-circle-o-notch" },{ name: "fa-circle-thin", code: "fa-circle-thin" },{ name: "fa-clipboard", code: "fa-clipboard" },{ name: "fa-clock-o", code: "fa-clock-o" },{ name: "fa-clone", code: "fa-clone" },{ name: "fa-close", code: "fa-close" },{ name: "fa-cloud", code: "fa-cloud" },{ name: "fa-cloud-download", code: "fa-cloud-download" },{ name: "fa-cloud-upload", code: "fa-cloud-upload" },{ name: "fa-cny", code: "fa-cny" },{ name: "fa-code", code: "fa-code" },{ name: "fa-code-fork", code: "fa-code-fork" },{ name: "fa-codepen", code: "fa-codepen" },{ name: "fa-coffee", code: "fa-coffee" },{ name: "fa-cog", code: "fa-cog" },{ name: "fa-cogs", code: "fa-cogs" },{ name: "fa-columns", code: "fa-columns" },{ name: "fa-comment", code: "fa-comment" },{ name: "fa-comment-o", code: "fa-comment-o" },{ name: "fa-commenting", code: "fa-commenting" },{ name: "fa-commenting-o", code: "fa-commenting-o" },{ name: "fa-comments", code: "fa-comments" },{ name: "fa-comments-o", code: "fa-comments-o" },{ name: "fa-compass", code: "fa-compass" },{ name: "fa-compress", code: "fa-compress" },{ name: "fa-connectdevelop", code: "fa-connectdevelop" },{ name: "fa-contao", code: "fa-contao" },{ name: "fa-copy", code: "fa-copy" },{ name: "fa-copyright", code: "fa-copyright" },{ name: "fa-creative-commons", code: "fa-creative-commons" },{ name: "fa-credit-card", code: "fa-credit-card" },{ name: "fa-crop", code: "fa-crop" },{ name: "fa-crosshairs", code: "fa-crosshairs" },{ name: "fa-css3", code: "fa-css3" },{ name: "fa-cube", code: "fa-cube" },{ name: "fa-cubes", code: "fa-cubes" },{ name: "fa-cut", code: "fa-cut" },{ name: "fa-cutlery", code: "fa-cutlery" },{ name: "fa-dashboard", code: "fa-dashboard" },{ name: "fa-dashcube", code: "fa-dashcube" },{ name: "fa-database", code: "fa-database" },{ name: "fa-dedent", code: "fa-dedent" },{ name: "fa-delicious", code: "fa-delicious" },{ name: "fa-desktop", code: "fa-desktop" },{ name: "fa-deviantart", code: "fa-deviantart" },{ name: "fa-diamond", code: "fa-diamond" },{ name: "fa-digg", code: "fa-digg" },{ name: "fa-dollar", code: "fa-dollar" },{ name: "fa-download", code: "fa-download" },{ name: "fa-dribbble", code: "fa-dribbble" },{ name: "fa-dropbox", code: "fa-dropbox" },{ name: "fa-drupal", code: "fa-drupal" },{ name: "fa-edit", code: "fa-edit" },{ name: "fa-eject", code: "fa-eject" },{ name: "fa-ellipsis-h", code: "fa-ellipsis-h" },{ name: "fa-ellipsis-v", code: "fa-ellipsis-v" },{ name: "fa-empire", code: "fa-empire" },{ name: "fa-envelope", code: "fa-envelope" },{ name: "fa-envelope-o", code: "fa-envelope-o" },{ name: "fa-eur", code: "fa-eur" },{ name: "fa-euro", code: "fa-euro" },{ name: "fa-exchange", code: "fa-exchange" },{ name: "fa-exclamation", code: "fa-exclamation" },{ name: "fa-exclamation-circle", code: "fa-exclamation-circle" },{ name: "fa-exclamation-triangle", code: "fa-exclamation-triangle" },{ name: "fa-expand", code: "fa-expand" },{ name: "fa-expeditedssl", code: "fa-expeditedssl" },{ name: "fa-external-link", code: "fa-external-link" },{ name: "fa-external-link-square", code: "fa-external-link-square" },{ name: "fa-eye", code: "fa-eye" },{ name: "fa-eye-slash", code: "fa-eye-slash" },{ name: "fa-eyedropper", code: "fa-eyedropper" },{ name: "fa-facebook", code: "fa-facebook" },{ name: "fa-facebook-f", code: "fa-facebook-f" },{ name: "fa-facebook-official", code: "fa-facebook-official" },{ name: "fa-facebook-square", code: "fa-facebook-square" },{ name: "fa-fast-backward", code: "fa-fast-backward" },{ name: "fa-fast-forward", code: "fa-fast-forward" },{ name: "fa-fax", code: "fa-fax" },{ name: "fa-feed", code: "fa-feed" },{ name: "fa-female", code: "fa-female" },{ name: "fa-fighter-jet", code: "fa-fighter-jet" },{ name: "fa-file", code: "fa-file" },{ name: "fa-file-archive-o", code: "fa-file-archive-o" },{ name: "fa-file-audio-o", code: "fa-file-audio-o" },{ name: "fa-file-code-o", code: "fa-file-code-o" },{ name: "fa-file-excel-o", code: "fa-file-excel-o" },{ name: "fa-file-image-o", code: "fa-file-image-o" },{ name: "fa-file-movie-o", code: "fa-file-movie-o" },{ name: "fa-file-o", code: "fa-file-o" },{ name: "fa-file-pdf-o", code: "fa-file-pdf-o" },{ name: "fa-file-photo-o", code: "fa-file-photo-o" },{ name: "fa-file-picture-o", code: "fa-file-picture-o" },{ name: "fa-file-powerpoint-o", code: "fa-file-powerpoint-o" },{ name: "fa-file-sound-o", code: "fa-file-sound-o" },{ name: "fa-file-text", code: "fa-file-text" },{ name: "fa-file-text-o", code: "fa-file-text-o" },{ name: "fa-file-video-o", code: "fa-file-video-o" },{ name: "fa-file-word-o", code: "fa-file-word-o" },{ name: "fa-file-zip-o", code: "fa-file-zip-o" },{ name: "fa-files-o", code: "fa-files-o" },{ name: "fa-film", code: "fa-film" },{ name: "fa-filter", code: "fa-filter" },{ name: "fa-fire", code: "fa-fire" },{ name: "fa-fire-extinguisher", code: "fa-fire-extinguisher" },{ name: "fa-firefox", code: "fa-firefox" },{ name: "fa-flag", code: "fa-flag" },{ name: "fa-flag-checkered", code: "fa-flag-checkered" },{ name: "fa-flag-o", code: "fa-flag-o" },{ name: "fa-flash", code: "fa-flash" },{ name: "fa-flask", code: "fa-flask" },{ name: "fa-flickr", code: "fa-flickr" },{ name: "fa-floppy-o", code: "fa-floppy-o" },{ name: "fa-folder", code: "fa-folder" },{ name: "fa-folder-o", code: "fa-folder-o" },{ name: "fa-folder-open", code: "fa-folder-open" },{ name: "fa-folder-open-o", code: "fa-folder-open-o" },{ name: "fa-font", code: "fa-font" },{ name: "fa-fonticons", code: "fa-fonticons" },{ name: "fa-forumbee", code: "fa-forumbee" },{ name: "fa-forward", code: "fa-forward" },{ name: "fa-foursquare", code: "fa-foursquare" },{ name: "fa-frown-o", code: "fa-frown-o" },{ name: "fa-futbol-o", code: "fa-futbol-o" },{ name: "fa-gamepad", code: "fa-gamepad" },{ name: "fa-gavel", code: "fa-gavel" },{ name: "fa-gbp", code: "fa-gbp" },{ name: "fa-ge", code: "fa-ge" },{ name: "fa-gear", code: "fa-gear" },{ name: "fa-gears", code: "fa-gears" },{ name: "fa-genderless", code: "fa-genderless" },{ name: "fa-get-pocket", code: "fa-get-pocket" },{ name: "fa-gg", code: "fa-gg" },{ name: "fa-gg-circle", code: "fa-gg-circle" },{ name: "fa-gift", code: "fa-gift" },{ name: "fa-git", code: "fa-git" },{ name: "fa-git-square", code: "fa-git-square" },{ name: "fa-github", code: "fa-github" },{ name: "fa-github-alt", code: "fa-github-alt" },{ name: "fa-github-square", code: "fa-github-square" },{ name: "fa-gittip", code: "fa-gittip" },{ name: "fa-glass", code: "fa-glass" },{ name: "fa-globe", code: "fa-globe" },{ name: "fa-google", code: "fa-google" },{ name: "fa-google-plus", code: "fa-google-plus" },{ name: "fa-google-plus-square", code: "fa-google-plus-square" },{ name: "fa-google-wallet", code: "fa-google-wallet" },{ name: "fa-graduation-cap", code: "fa-graduation-cap" },{ name: "fa-gratipay", code: "fa-gratipay" },{ name: "fa-group", code: "fa-group" },{ name: "fa-h-square", code: "fa-h-square" },{ name: "fa-hacker-news", code: "fa-hacker-news" },{ name: "fa-hand-grab-o", code: "fa-hand-grab-o" },{ name: "fa-hand-lizard-o", code: "fa-hand-lizard-o" },{ name: "fa-hand-o-down", code: "fa-hand-o-down" },{ name: "fa-hand-o-left", code: "fa-hand-o-left" },{ name: "fa-hand-o-right", code: "fa-hand-o-right" },{ name: "fa-hand-o-up", code: "fa-hand-o-up" },{ name: "fa-hand-paper-o", code: "fa-hand-paper-o" },{ name: "fa-hand-peace-o", code: "fa-hand-peace-o" },{ name: "fa-hand-pointer-o", code: "fa-hand-pointer-o" },{ name: "fa-hand-rock-o", code: "fa-hand-rock-o" },{ name: "fa-hand-scissors-o", code: "fa-hand-scissors-o" },{ name: "fa-hand-spock-o", code: "fa-hand-spock-o" },{ name: "fa-hand-stop-o", code: "fa-hand-stop-o" },{ name: "fa-hdd-o", code: "fa-hdd-o" },{ name: "fa-header", code: "fa-header" },{ name: "fa-headphones", code: "fa-headphones" },{ name: "fa-heart", code: "fa-heart" },{ name: "fa-heart-o", code: "fa-heart-o" },{ name: "fa-heartbeat", code: "fa-heartbeat" },{ name: "fa-history", code: "fa-history" },{ name: "fa-home", code: "fa-home" },{ name: "fa-hospital-o", code: "fa-hospital-o" },{ name: "fa-hotel", code: "fa-hotel" },{ name: "fa-hourglass", code: "fa-hourglass" },{ name: "fa-hourglass-1", code: "fa-hourglass-1" },{ name: "fa-hourglass-2", code: "fa-hourglass-2" },{ name: "fa-hourglass-3", code: "fa-hourglass-3" },{ name: "fa-hourglass-end", code: "fa-hourglass-end" },{ name: "fa-hourglass-half", code: "fa-hourglass-half" },{ name: "fa-hourglass-o", code: "fa-hourglass-o" },{ name: "fa-hourglass-start", code: "fa-hourglass-start" },{ name: "fa-houzz", code: "fa-houzz" },{ name: "fa-html5", code: "fa-html5" },{ name: "fa-i-cursor", code: "fa-i-cursor" },{ name: "fa-ils", code: "fa-ils" },{ name: "fa-image", code: "fa-image" },{ name: "fa-inbox", code: "fa-inbox" },{ name: "fa-indent", code: "fa-indent" },{ name: "fa-industry", code: "fa-industry" },{ name: "fa-info", code: "fa-info" },{ name: "fa-info-circle", code: "fa-info-circle" },{ name: "fa-inr", code: "fa-inr" },{ name: "fa-instagram", code: "fa-instagram" },{ name: "fa-institution", code: "fa-institution" },{ name: "fa-internet-explorer", code: "fa-internet-explorer" },{ name: "fa-intersex", code: "fa-intersex" },{ name: "fa-ioxhost", code: "fa-ioxhost" },{ name: "fa-italic", code: "fa-italic" },{ name: "fa-joomla", code: "fa-joomla" },{ name: "fa-jpy", code: "fa-jpy" },{ name: "fa-jsfiddle", code: "fa-jsfiddle" },{ name: "fa-key", code: "fa-key" },{ name: "fa-keyboard-o", code: "fa-keyboard-o" },{ name: "fa-krw", code: "fa-krw" },{ name: "fa-language", code: "fa-language" },{ name: "fa-laptop", code: "fa-laptop" },{ name: "fa-lastfm", code: "fa-lastfm" },{ name: "fa-lastfm-square", code: "fa-lastfm-square" },{ name: "fa-leaf", code: "fa-leaf" },{ name: "fa-leanpub", code: "fa-leanpub" },{ name: "fa-legal", code: "fa-legal" },{ name: "fa-lemon-o", code: "fa-lemon-o" },{ name: "fa-level-down", code: "fa-level-down" },{ name: "fa-level-up", code: "fa-level-up" },{ name: "fa-life-bouy", code: "fa-life-bouy" },{ name: "fa-life-buoy", code: "fa-life-buoy" },{ name: "fa-life-ring", code: "fa-life-ring" },{ name: "fa-life-saver", code: "fa-life-saver" },{ name: "fa-lightbulb-o", code: "fa-lightbulb-o" },{ name: "fa-line-chart", code: "fa-line-chart" },{ name: "fa-link", code: "fa-link" },{ name: "fa-linkedin", code: "fa-linkedin" },{ name: "fa-linkedin-square", code: "fa-linkedin-square" },{ name: "fa-linux", code: "fa-linux" },{ name: "fa-list", code: "fa-list" },{ name: "fa-list-alt", code: "fa-list-alt" },{ name: "fa-list-ol", code: "fa-list-ol" },{ name: "fa-list-ul", code: "fa-list-ul" },{ name: "fa-location-arrow", code: "fa-location-arrow" },{ name: "fa-lock", code: "fa-lock" },{ name: "fa-long-arrow-down", code: "fa-long-arrow-down" },{ name: "fa-long-arrow-left", code: "fa-long-arrow-left" },{ name: "fa-long-arrow-right", code: "fa-long-arrow-right" },{ name: "fa-long-arrow-up", code: "fa-long-arrow-up" },{ name: "fa-magic", code: "fa-magic" },{ name: "fa-magnet", code: "fa-magnet" },{ name: "fa-mars-stroke-v", code: "fa-mars-stroke-v" },{ name: "fa-maxcdn", code: "fa-maxcdn" },{ name: "fa-meanpath", code: "fa-meanpath" },{ name: "fa-medium", code: "fa-medium" },{ name: "fa-medkit", code: "fa-medkit" },{ name: "fa-meh-o", code: "fa-meh-o" },{ name: "fa-mercury", code: "fa-mercury" },{ name: "fa-microphone", code: "fa-microphone" },{ name: "fa-mobile", code: "fa-mobile" },{ name: "fa-motorcycle", code: "fa-motorcycle" },{ name: "fa-mouse-pointer", code: "fa-mouse-pointer" },{ name: "fa-music", code: "fa-music" },{ name: "fa-navicon", code: "fa-navicon" },{ name: "fa-neuter", code: "fa-neuter" },{ name: "fa-newspaper-o", code: "fa-newspaper-o" },{ name: "fa-opencart", code: "fa-opencart" },{ name: "fa-openid", code: "fa-openid" },{ name: "fa-opera", code: "fa-opera" },{ name: "fa-outdent", code: "fa-outdent" },{ name: "fa-pagelines", code: "fa-pagelines" },{ name: "fa-paper-plane-o", code: "fa-paper-plane-o" },{ name: "fa-paperclip", code: "fa-paperclip" },{ name: "fa-paragraph", code: "fa-paragraph" },{ name: "fa-paste", code: "fa-paste" },{ name: "fa-pause", code: "fa-pause" },{ name: "fa-paw", code: "fa-paw" },{ name: "fa-paypal", code: "fa-paypal" },{ name: "fa-pencil", code: "fa-pencil" },{ name: "fa-pencil-square-o", code: "fa-pencil-square-o" },{ name: "fa-phone", code: "fa-phone" },{ name: "fa-photo", code: "fa-photo" },{ name: "fa-picture-o", code: "fa-picture-o" },{ name: "fa-pie-chart", code: "fa-pie-chart" },{ name: "fa-pied-piper", code: "fa-pied-piper" },{ name: "fa-pied-piper-alt", code: "fa-pied-piper-alt" },{ name: "fa-pinterest", code: "fa-pinterest" },{ name: "fa-pinterest-p", code: "fa-pinterest-p" },{ name: "fa-pinterest-square", code: "fa-pinterest-square" },{ name: "fa-plane", code: "fa-plane" },{ name: "fa-play", code: "fa-play" },{ name: "fa-play-circle", code: "fa-play-circle" },{ name: "fa-play-circle-o", code: "fa-play-circle-o" },{ name: "fa-plug", code: "fa-plug" },{ name: "fa-plus", code: "fa-plus" },{ name: "fa-plus-circle", code: "fa-plus-circle" },{ name: "fa-plus-square", code: "fa-plus-square" },{ name: "fa-plus-square-o", code: "fa-plus-square-o" },{ name: "fa-power-off", code: "fa-power-off" },{ name: "fa-print", code: "fa-print" },{ name: "fa-puzzle-piece", code: "fa-puzzle-piece" },{ name: "fa-qq", code: "fa-qq" },{ name: "fa-qrcode", code: "fa-qrcode" },{ name: "fa-question", code: "fa-question" },{ name: "fa-question-circle", code: "fa-question-circle" },{ name: "fa-quote-left", code: "fa-quote-left" },{ name: "fa-quote-right", code: "fa-quote-right" },{ name: "fa-ra", code: "fa-ra" },{ name: "fa-random", code: "fa-random" },{ name: "fa-rebel", code: "fa-rebel" },{ name: "fa-recycle", code: "fa-recycle" },{ name: "fa-reddit", code: "fa-reddit" },{ name: "fa-reddit-square", code: "fa-reddit-square" },{ name: "fa-refresh", code: "fa-refresh" },{ name: "fa-registered", code: "fa-registered" },{ name: "fa-remove", code: "fa-remove" },{ name: "fa-renren", code: "fa-renren" },{ name: "fa-reorder", code: "fa-reorder" },{ name: "fa-repeat", code: "fa-repeat" },{ name: "fa-reply", code: "fa-reply" },{ name: "fa-reply-all", code: "fa-reply-all" },{ name: "fa-retweet", code: "fa-retweet" },{ name: "fa-rmb", code: "fa-rmb" },{ name: "fa-road", code: "fa-road" },{ name: "fa-rocket", code: "fa-rocket" },{ name: "fa-rotate-left", code: "fa-rotate-left" },{ name: "fa-rotate-right", code: "fa-rotate-right" },{ name: "fa-rouble", code: "fa-rouble" },{ name: "fa-rss", code: "fa-rss" },{ name: "fa-rss-square", code: "fa-rss-square" },{ name: "fa-rub", code: "fa-rub" },{ name: "fa-ruble", code: "fa-ruble" },{ name: "fa-rupee", code: "fa-rupee" },{ name: "fa-safari", code: "fa-safari" },{ name: "fa-sliders", code: "fa-sliders" },{ name: "fa-slideshare", code: "fa-slideshare" },{ name: "fa-smile-o", code: "fa-smile-o" },{ name: "fa-sort-asc", code: "fa-sort-asc" },{ name: "fa-sort-desc", code: "fa-sort-desc" },{ name: "fa-sort-down", code: "fa-sort-down" },{ name: "fa-spinner", code: "fa-spinner" },{ name: "fa-spoon", code: "fa-spoon" },{ name: "fa-spotify", code: "fa-spotify" },{ name: "fa-square", code: "fa-square" },{ name: "fa-square-o", code: "fa-square-o" },{ name: "fa-star", code: "fa-star" },{ name: "fa-star-half", code: "fa-star-half" },{ name: "fa-stop", code: "fa-stop" },{ name: "fa-subscript", code: "fa-subscript" },{ name: "fa-tablet", code: "fa-tablet" },{ name: "fa-tachometer", code: "fa-tachometer" },{ name: "fa-tag", code: "fa-tag" },{ name: "fa-tags", code: "fa-tags" }]
)

const productService = new ProductService();

onBeforeMount(() => {
    initFilters();
});
onMounted(async () => {
    let preCourses = localStorage.getItem('courses');
    productService.getProducts().then((data) => { products.value = data;});
    productService.getChapters().then((data) => {courses.value = data; store.dispatch('setLessons',data); localStorage.setItem('courses',JSON.stringify(data))});
    if(!preCourses){
        
    }else{
        courses.value = JSON.parse(preCourses);
    }
    productService.getModules().then((data) => (modules.value = data));
});
const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const openNew = () => {
    product.value = {};
    submitted.value = false;
    productDialog.value = true;
};

const hideDialog = () => {
    productDialog.value = false;
    submitted.value = false;
};

const saveProduct = () => {
    submitted.value = true;
    console.log(product.value);
    productService.addCourses(product.value).then((response) => { 
        console.log(response)
        if(response.status){
            toast.add({ severity: 'success', summary: 'Chapter Added Successfully.', detail: 'Message Content', life: 3000 });
        }else
        {
            let errorKey = Object.keys(response.error);
            toast.add({ severity: 'error', summary: response.error[errorKey][0], detail: response.erorr, life: 3000 });
        }
    });
    return false;
    if (product.value.name && product.value.name.trim() && product.value.price) {
        if (product.value.id) {
            product.value.inventoryStatus = product.value.inventoryStatus.value ? product.value.inventoryStatus.value : product.value.inventoryStatus;
            products.value[findIndexById(product.value.id)] = product.value;
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        } else {
            product.value.id = createId();
            product.value.code = createId();
            product.value.image = 'product-placeholder.svg';
            product.value.inventoryStatus = product.value.inventoryStatus ? product.value.inventoryStatus.value : 'INSTOCK';
            products.value.push(product.value);
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        }
        productDialog.value = false;
        product.value = {};
    }
};

const editProduct = (editProduct) => {
    product.value = { ...editProduct,status : { label: 'ENABLE', value: "1" } };
    console.log(product);
    productDialog.value = true;
};

const confirmDeleteProduct = (editProduct) => {
    product.value = editProduct;
    deleteProductDialog.value = true;
};

const deleteProduct = () => {
    products.value = products.value.filter((val) => val.id !== product.value.id);
    deleteProductDialog.value = false;
    product.value = {};
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
};

const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < products.value.length; i++) {
        if (products.value[i].id === id) {
            index = i;
            break;
        }
    }
    return index;
};

const createId = () => {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
};

const exportCSV = () => {
    dt.value.exportCSV();
};

const confirmDeleteSelected = () => {
    deleteProductsDialog.value = true;
};
const deleteSelectedProducts = () => {
    products.value = products.value.filter((val) => !selectedProducts.value.includes(val));
    deleteProductsDialog.value = false;
    selectedProducts.value = null;
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
};

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
<pre>
    {{ this.$store.state.users }}
</pre>

                <Toast />
                <Toolbar class="mb-4">
                    <template v-slot:start>
                        <div class="my-2">
                            <Button label="New Chapter" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
                            <Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
                        </div>
                    </template>

                    <template v-slot:end>
                        <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block" />
                        <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)" />
                    </template>
                </Toolbar>

                <DataTable
                   
                    ref="dt"
                    :value="courses"
                >

                <Column field="id" header="ID"></Column>
                <Column field="name" header="Name" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                    <template #body="slotProps">
                        <span class="p-column-title">Title</span>
                        {{ slotProps.data.title }}
                    </template>
                </Column>
                <Column field="icon" header="Icon"></Column>
                <Column field="status" header="Status" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                    <template #body="slotProps">
                        <span class="p-column-title">Status</span>
                        <span :class="'product-badge status-' + (slotProps.data.status == 1 ? 'Enabled' : 'Disabled')">{{ slotProps.data.status == 1 ? "Enabled" : 'Disabled' }}</span>
                    </template>
                    </Column>
                <Column field="subtitle" header="Subtitle"></Column>
                <Column field="description" header="Description"></Column>
                
                     <template #header>
                        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                            <h5 class="m-0">Manage Chapters</h5>
                            <span class="block mt-2 md:mt-0 p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Search..." />
                            </span>
                        </div>
                    </template>

                    <Column headerStyle="min-width:10rem;">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editProduct(slotProps.data)" />
                            <router-link  :to="'/chapters/'+slotProps.data.id+'/lessons'">
                               <Button icon="pi pi-eye" class="p-button-rounded p-button-success mr-2" />
                            </router-link>
                            <!-- <Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2" @click="confirmDeleteProduct(slotProps.data)" /> -->
                        </template>
                    </Column>
                </DataTable>

                <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Add new chapter" :modal="true" class="p-fluid">
                    <img :src="contextPath + 'demo/images/product/' + product.image" :alt="product.image" v-if="product.image" width="150" class="mt-0 mx-auto mb-5 block shadow-2" />
                    <div class="field">
                        <label for="name">Name</label>
                        <InputText id="name" v-model.trim="product.title" required="true" autofocus :class="{ 'p-invalid': submitted && !product.title }" />
                        <small class="p-invalid" v-if="submitted && !product.title">Name is required.</small>
                    </div>

                    <div class="field">
                        <label for="name">Sub Title</label>
                        <InputText id="name" v-model.trim="product.subtitle" required="true" autofocus :class="{ 'p-invalid': submitted && !product.subtitle }" />
                        <small class="p-invalid" v-if="submitted && !product.subtitle">Subtitle is required.</small>
                    </div>

                    <div class="field">
                        <label for="description">Description</label>
                        <Textarea id="description" v-model="product.description" required="true" rows="3" cols="20" />
                    </div>

                    <div class="field">
                        <label for="description">Icon</label>
                        <Dropdown  :options="icons" v-model.trim="product.icon" optionLabel="name" placeholder="Select an icon" class="w-full" filter >
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

                    <div class="field">
                        <label for="inventoryStatus" class="mb-3">Inventory Status</label>
                        <Dropdown id="inventoryStatus" v-model="product.status" :options="courseStatuses" optionLabel="label" placeholder="Select a Status">
                            <template #value="slotProps">
                                <div v-if="slotProps.value && slotProps.value.value">
                                    <span :class="'product-badge status-' + slotProps.value.value">{{ slotProps.value.label }}</span>
                                </div> 

                                <!-- <div v-if="slotProps.value && slotProps.value.value">
                                    <span :class="'product-badge status-' + slotProps.value.value">{{ slotProps.value.label }}</span>
                                </div>
                                <div v-else-if="slotProps.value && !slotProps.value.value">
                                    <span :class="'product-badge status-' + slotProps.value.toLowerCase()">{{ slotProps.value }}</span>
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span> -->
                            </template>
                        </Dropdown>
                    </div>

                    <div class="field">
                        <label class="mb-3">Category</label>
                        <div class="formgrid grid" v-if="modules">
                            <div class="field-radiobutton col-6" v-for="module in modules" :key="module.id">
                                <RadioButton :inputId="'category'+module.id" name="category" :value="module.id" v-model="product.module_id" />
                                <label :for="'category'+module.id">{{module.title}}</label>
                            </div>
                        </div>
                    </div>

                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
                        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
                    </template>
                </Dialog>

                 <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="product"
                            >Are you sure you want to delete <b>{{ product.name }}</b
                            >?</span
                        >
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductDialog = false" />
                        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteProduct" />
                    </template>
                </Dialog>

                <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="product">Are you sure you want to delete the selected products?</span>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductsDialog = false" />
                        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteSelectedProducts" />
                    </template>
                </Dialog>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/demo/styles/badges.scss';
</style>
