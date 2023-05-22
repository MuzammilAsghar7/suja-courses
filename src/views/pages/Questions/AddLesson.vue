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

                     <div class="flex gap-5">
                        <div class="mb-5 mt-4 gap-2 w-100">
                          <Checkbox v-model="lesson.multiple" inputId="multiple_lessons" name="multiple" value="1" />
                          <label for="multiple_lessons" class="ml-2"> Have multiple lessons. </label>
                        </div>

                        <div class="mb-5 mt-4 gap-2 w-100">
                             <Checkbox v-model="lesson.is_inner_lesson" inputId="inner_lesson" name="multiple" value="1" />
                           <label for="inner_lesson" class="ml-2"> Inner Lesson. </label>
                        </div>
                    
                        <div class="mb-5 mt-4 gap-2 w-100" v-if="lesson.is_inner_lesson != ''">
                             <h6>Select lesson</h6>
                             <Dropdown v-model="lesson.lesson_id" :options="lessons.lessonsSelect" optionLabel="name" placeholder="Select a Lesson" class="w-full md:w-14rem">
                            </Dropdown>
                        </div>
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

                    <div class="border-1 surface-border border-round mb-4">
                        <span class="text-900 font-bold block border-bottom-1 surface-border p-3">Tags</span>
                        <div class="p-3 flex gap-2">
                            <Dropdown v-model="selectedCountry" :options="countries" optionLabel="name" placeholder="Select a Country" class="w-full md:w-14rem">
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="flex align-items-center p-chip p-component">
                                    <!-- <img :alt="slotProps.value.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`" style="width: 18px" /> -->
                                    <div>{{ slotProps.value.name }}</div>
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                            </Dropdown>

                            <div class="p-chip p-component" aria-label="Software">
                            <!---->
                             <div class="p-chip-text">Software</div>
                            <!---->
                            </div>
                            <div class="p-chip p-component" aria-label="Web">
                            <!---->
                            <div class="p-chip-text">Web</div>
                            <!---->
                            </div>
                        </div>
                        </div>

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