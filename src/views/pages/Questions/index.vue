<script setup>
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount } from 'vue';
import QuestionService from '@/service/QuestionService.js';
import { useToast } from 'primevue/usetoast';
import { useLayout } from '@/layout/composables/layout';
import { useRoute,useRouter } from 'vue-router';
import axios from 'axios';
import router from '../../../router';

const toast = useToast();
const route = useRoute();
const { contextPath } = useLayout();

const products = ref(null);
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const selectedProducts = ref(null);
const loading = ref(true)
const dt = ref(null);
const filters = ref({});
const submitted = ref(false);
const courseStatuses = ref([
    { label: 'ENABLE', value: "1" },
    { label: 'DISABLE', value: "0" },
]);

let lessonId = route.query.lessonId;
let chapterId = route.query.chapterId;

const questions = ref(null);
const questionService = new QuestionService();
onBeforeMount(() => {
    initFilters();
});
onMounted(async () => {
    if(!lessonId || !chapterId){
        router.push('/');
    }
    questionService.getAllQuestions({lessonId,chapterId}).then((data) => { questions.value = data.questions; loading.value=false; });
    console.log(questions);
    
});

const exportCSV = () => {
    dt.value.exportCSV();
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
                <!-- <pre>
                    {{ questions }}
                </pre> -->
                <Toast />
                <Toolbar class="mb-4">
                    <template v-slot:start>
                        <div class="my-2">
                         <RouterLink to="add-question">
                            <Button label="New Quetion" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
                         </RouterLink>
                            <!-- <Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" /> -->
                        </div>
                    </template>
                </Toolbar>

                <DataTable
                    ref="dt"
                    :value="questions"
                    :loading="loading"
                    paginator 
                    :rows="5" 
                    :rowsPerPageOptions="[5, 10, 20, 50]"
                >
                <template #header>
                    <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                        <h5 class="m-0">Manage Questions</h5>
                        <span class="block mt-2 md:mt-0 p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                        </span>
                    </div>
                </template>
                <template #loading>
                    <div class="bg-white h-full w-full">
                    <div class="flex gap-4 mb-4">
                    <Skeleton class="mb-2" height="2rem"></Skeleton>
                    <Skeleton width="100%" height="2rem" class="mb-2"></Skeleton>
                    <Skeleton width="100%" height="2rem" class="mb-2"></Skeleton>
                    <Skeleton width="100%" height="2rem" class="mb-2"></Skeleton>
                    <Skeleton width="100%" height="2rem" class="mb-2"></Skeleton>
                    </div>
                    <div class="flex gap-4 mb-4">
                    <Skeleton class="mb-2" height="2rem"></Skeleton>
                    <Skeleton width="100%" height="2rem" class="mb-2"></Skeleton>
                    <Skeleton width="100%" height="2rem" class="mb-2"></Skeleton>
                    <Skeleton width="100%" height="2rem" class="mb-2"></Skeleton>
                    <Skeleton width="100%" height="2rem" class="mb-2"></Skeleton>
                    </div>
                    <div class="flex gap-4 mb-4">
                    <Skeleton class="mb-2" height="2rem"></Skeleton>
                    <Skeleton width="100%" height="2rem" class="mb-2"></Skeleton>
                    <Skeleton width="100%" height="2rem" class="mb-2"></Skeleton>
                    <Skeleton width="100%" height="2rem" class="mb-2"></Skeleton>
                    <Skeleton width="100%" height="2rem" class="mb-2"></Skeleton>
                    </div>
                    <div class="flex gap-4 mb-4">
                    <Skeleton class="mb-2" height="2rem"></Skeleton>
                    <Skeleton width="100%" height="2rem" class="mb-2"></Skeleton>
                    <Skeleton width="100%" height="2rem" class="mb-2"></Skeleton>
                    <Skeleton width="100%" height="2rem" class="mb-2"></Skeleton>
                    <Skeleton width="100%" height="2rem" class="mb-2"></Skeleton>
                    </div>
                </div>
                </template>

                <Column field="title" style="width: 50%" header="Title" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                    <template #body="slotProps">
                        <span class="p-column-title">Title</span>
                        <h5>{{ slotProps.data.title }}</h5>
                    </template>
                </Column>
                <Column field="status" header="Status" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                    <template #body="slotProps">
                        <span class="p-column-title">Status</span>
                        <span :class="'product-badge status-' + (slotProps.data.status == 1 ? 'Enabled' : 'Disabled')">{{ slotProps.data.status == 1 ? "Enabled" : 'Disabled' }}</span>
                    </template>
                </Column>

                    <Column headerStyle="min-width:10rem;">
                        <template #body="slotProps">
                            <router-link  :to="{ path: 'add-question', query: { questionId:slotProps.data.id,lessonId,edit:true,chapterId  }}">
                               <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" />
                            </router-link>
                            <!-- <Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2" @click="confirmDeleteProduct(slotProps.data)" /> -->
                        </template>
                    </Column>
                </DataTable>

            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/demo/styles/badges.scss';
</style>
