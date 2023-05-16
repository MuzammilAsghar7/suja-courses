<script setup>
// import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import Editor from 'primevue/editor';
import { ref,onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import QuestionService from '@/service/QuestionService.js';
import ProductService from '@/service/ProductService.js';
import ProgressSpinner from 'primevue/progressspinner';
import { useStore } from 'vuex';
import { useField, useForm } from 'vee-validate';
const { value, errorMessage } = useField('selectedCountry', validateField);
const route = useRoute();
const store = useStore();
const toast = useToast();

function validateField(selectedCountry) {
    if (!selectedCountry) {
        return 'Value is required.';
    }

    return true;
}

const lessons = computed(() =>  store.state.lessons )
const configs = computed(() =>  store.state.global.config )
const questionTypes = computed(() => store.getters.questionTypes)
let lessonId = route.query.lessonId;
let questionId = route.query.questionId;
let chapterId = route.query.chapterId;
let edit = route.query.edit;
var mcqs = ref([{ options : '', answerOptions:false}]);
const selectedCountry = ref('');
const pageTitle = ref('Add a new Question');
const loading = ref(true); 
const options = ref([]); 
const selectedmcqs = ref([]);
const question = ref({status:1,lesson_id:lessonId});
// import { useLayout } from '@/layout/composables/layout';
const questionService = new QuestionService();
const productService = new ProductService();
onMounted(()=>{
    if(edit){
        console.log('edit is here')
        pageTitle.value = "Edit lesson"
        questionService.getQuestion(questionId).then((data) => { 
            question.value = data.question; 
            // console.log(data.question.selectedmcqs); 
            loading.value=false;
            if(data.question.selectedmcqs){
                selectedmcqs.value = data.question.selectedmcqs;
            }
        });

    }else
    {
        loading.value=false
    }
    productService.getoptions().then((data) => { mcqs.value = data });
})

// action methods
const handleQuestionType = (event) => {
    // if(event.target.value == 'mcqs')
    // {
    //     question.mcqs = []
    // }
}

const selectedfalse = (index) => {
    
    selectedmcqs.value.forEach((element, index2) => {
        if(index2 == index){
            selectedmcqs.value[index2].use = true
        } else{
            selectedmcqs.value[index2].use = false
        }
    });

    console.log(selectedmcqs.value)
}

const addMoreQuestion = () => {
    let inx  = mcqs.value.length;
    mcqs.value[inx] = { lesson : '',answerOptions:[]};
    console.log(mcqs.value);
}
const saveQuestion = () => {
    question.value.mcqs=selectedmcqs.value;
    if(!question.value.type){
        toast.add({ severity: 'error', summary: 'Error', detail: 'select qustion type', life: 3000 })
        return false
    }
    if(question.value.type == 3){
        if(!question.value.mcqs){
            toast.add({ severity: 'error', summary: 'Error', detail: 'select qustion option', life: 3000 })
            return false
        }

        if(selectedCountry.value == ''){
            toast.add({ severity: 'error', summary: 'Error', detail: 'select option', life: 3000 })
            return false
        }
    }
   
    
    if(lessonId && edit){
        // questionService.updateQuestion(lessonId,question.value)
        // .then((data) => {
        //     loading.value=false;  
        //     toast.add({ severity: 'success', summary: 'Updated', detail: 'Question has been updated Successfully.', life: 3000 });
        // });
    }
    else{
        questionService.addQuestion(question.value).then((response) => { 
            console.log(response);
            if(response.status){
                toast.add({ severity: 'success', summary: 'Added', detail: 'Question has been added Successfully.', life: 3000 })
            }else
            {
                response.errors.forEach((error) => {
                    toast.add({ severity: 'error', summary: 'Error', detail: error.error, life: 3000 })
                })
            }
        })
    }
};
const onAdvancedUpload = async (event) => {
    lesson.value.file = await event.files[0];
}
const removeFileFromQuestion = () => {
    lesson.value.file = null;
} 
const removeMCQ = (index) => {
    mcqs.value.splice(index,1);
}


// const { layoutConfig, layoutState, setActiveMenuItem, onMenuToggle } = useLayout();
</script>

<template>
    <div className="grid">
        <pre>
            {{ selectedmcqs }}
            {{ selectedCountry }}
        </pre>
        <Toast />
        <div className="col-12">
            <div className="card">
              <ProgressBar v-if="loading" mode="indeterminate" style="height: 6px"></ProgressBar>
                <h4>{{pageTitle}}</h4>
                <form @submit.prevent="saveQuestion" class="flex flex-column gap-2" >
                <div class="grid">
                    <div class="col-8">
                        <div class="mb-3 gap-2 w-100">
                            <label for="username" class="p-sr-only">Title</label>
                            <InputText v-model="question.title" id="username" placeholder="Title" class="w-full" />
                        </div>

                        <div class="mb-4 gap-2 w-100 hidden">
                            <Editor  v-model="question.description" editorStyle="height: 320px" />
                        </div>
 

                        <div class="mb-3 gap-2 w-100 hidden">
                            <label for="Content" class="p-sr-only">Content</label>
                            <Textarea v-model="question.excerpt" id="Content" autoResize placeholder="Content" class="w-full" rows="6" cols="30" />
                        </div>
                        <div class="my-4">  
                        
                        <label class="block font-semibold text-900 text-lg mb-3" block>Question Type</label>
                        <div class="flex flex-wrap gap-3" v-if="questionTypes">
                            <div class="flex align-items-center"  v-for="(type,index) in questionTypes">
                                <RadioButton v-model="question.type" :inputId="'question-type'+index" :name="'question-type'+index" :value="type.id" @change="handleQuestionType($event)"/>
                                <label :for="'question-type'+index" class="ml-2">{{type.title}}</label>
                            </div>
                        </div>
                        
                       </div>

                        <div class="mcqs" v-if="question.type == 3">
                            <span class="block font-semibold text-900 text-lg mb-3 mt-4 flex">
                                <h5 class="mb-2 mt-3">Add Multiple Choice Questions</h5>
                            </span>
                            <div class="grid">
                                <div class="col-12">
                                    <div class="mcqs_question" v-for="(mcq,index) in selectedmcqs">
                                        <div class="flex align-items-center">
                                            <RadioButton v-model="selectedCountry" :inputId="'select_'+index" name="pizza" @change="selectedfalse(index)" :value="mcq.name"/>
                                            <label :for="'select_'+index" class="ml-2">{{ mcq.name }}</label>
                                        </div>
                                    </div>
                                    <small id="text-error" class="p-error">{{ errorMessage || '&nbsp;' }}</small>
                                  <!-- <div class="mcqs_question" v-for="(mcq,index) in mcqs">
                                      <span class="p-button-rounded mb-3 ml-auto pi pi-times block" @click="removeMCQ(index)" style="display:table"></span>
                                        <div class="mb-3">
                                        <label for="username" class="p-sr-only">Title</label>
                                            <InputText v-model="mcq.question" id="username" placeholder="Question" class="w-full" />
                                        </div>
                                        <div class="mb-3">
                                            <Chips v-model="mcq.answerOptions" placeholder="Answer Options" class="w-full" />
                                            <InputText v-model="mcq.answerOptions" placeholder="Answer Options" class="w-full" />
                                        </div>
                                        <Divider />
                                    </div>
                                    
                                    <button class="p-button p-component p-button-primary flex-1" type="button" aria-label="Publish" @click="addMoreQuestion()">
                                        <span class="pi pi-fw pi-check p-button-icon p-button-icon-left"></span>
                                        <span class="p-button-label">Add</span>
                                        <span class="p-ink" role="presentation" aria-hidden="true"></span>
                                    </button> -->

                                </div>
                            </div>
                        </div>

                        <!-- <FileUpload name="demo[]" :showUploadButton="false" :showCancelButton="false" :fileLimit="1" @remove="removeFileFromQuestion()" @select="onAdvancedUpload($event)"  accept="image/*" :maxFileSize="1000000">
                            <template #empty>
                                <p>Drag and drop files to here to upload.</p>
                            </template>
                        </FileUpload> -->
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
                            <span class="p-button-label" v-if="!lessonId && edit">Update</span>
                            <span class="p-button-label" v-else>Publish</span>
                            <!---->
                            <span class="p-ink" role="presentation" aria-hidden="true"></span>
                        </button>
                        </div>
                        <MultiSelect v-model="selectedmcqs" display="chip" :options="mcqs" optionLabel="name" placeholder="Select Options"
                    :maxSelectedLabels="3" class="w-full mt-4" />
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


<!-- $2y$10$nJA60PKs0YNHK9WY/g/CCeHwc5OcGYMTP31NDVEw3Hma6EFq6tO5W -->