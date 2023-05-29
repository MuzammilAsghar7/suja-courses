<script setup>
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount } from 'vue';
import LessonService from '@/service/LessonService.js';
import { useToast } from 'primevue/usetoast';
import { useLayout } from '@/layout/composables/layout';
import axios from 'axios';
import { useRoute } from 'vue-router';

const toast = useToast();
const { contextPath } = useLayout();
const route = useRoute();
const chapterId =  route.params.id;

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

const questions = ref(null);
const lessonService = new LessonService();
onBeforeMount(() => {
    initFilters();
});
onMounted(async () => {
    console.log(chapterId);
    lessonService.getAllLessons(chapterId).then((data) => { questions.value = data.data; loading.value=false;});
    console.log(questions.value);
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
                            <RouterLink :to="{ path: '/add-lesson', query: { chapterId }}">
                                <Button label="New Lesson" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
                            </RouterLink>
                            <!-- <Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" /> -->
                        </div>
                    </template>

                    <!-- <template v-slot:end>
                        <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block" />
                        <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)" />
                    </template> -->
                </Toolbar>
                <DataTable
                    ref="dt"
                    :value="questions"
                    :loading="loading"
                    paginator 
                    :rows="100" 
                    :rowsPerPageOptions="[5, 10, 20, 50]"
                >
                    <template #header>
                        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                            <h5 class="m-0">Manage Lessons</h5>
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
                    <Column field="name" header="Title" style="width: 40%" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Title</span>
                            <h5>{{ slotProps.data.title }}</h5>
                        </template>
                    </Column>
                    <Column field="status" header="Status" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Status </span>
                            <span :class="'product-badge status-' + (slotProps.data.status == 1 ? 'Enabled' : 'Disabled')">{{ slotProps.data.status == 1 ? "Enabled" : 'Disabled' }}</span>
                        </template>
                    </Column>

                    <Column header="Questions">
                        <template #body="slotProps">
                            <div v-if="slotProps.data.multiple != 1 && slotProps.data.parent == 0">
                                <RouterLink :to="{ path: '/questions', query: { chapterId,lessonId:slotProps.data.id }}" v-if="slotProps.data.questions_count > 0">
                                    <Button type="button" label="Questions" :badge="slotProps.data.questions_count" class="p-button-warning" />
                                </RouterLink>
                                <span v-else>Not Found any question</span>
                            </div>
                            <div v-else-if="slotProps.data.multiple == 1">
                                Parent
                            </div>
                            <div v-else-if="slotProps.data.parent != 0">
                                {{slotProps.data.lessonname.title}}
                                <RouterLink :to="{ path: '/questions', query: { chapterId,lessonId:slotProps.data.id }}" v-if="slotProps.data.questions_count > 0">
                                    <Button type="button" label="Questions" :badge="slotProps.data.questions_count" class="p-button-warning" />
                                </RouterLink>
                            </div>
                        </template>
                    </Column>

                    <Column header="Add Question">
                        <template #body="slotProps">
                            <div v-if="slotProps.data.multiple != 1">
                                <router-link  :to="{ path: '/add-question', query: { lessonId:slotProps.data.id,chapterId  }}">
                                    <Button label="Add Question" icon="pi pi-plus" class="p-button-rounded mr-2 mb-2" />
                                </router-link>
                            </div>
                            <div v-else>
                                <router-link  :to="{ path: '/add-innerlesson', query: { lessonId:slotProps.data.id,chapterId  }}">
                                    <Button label="Add InnerLesson" icon="pi pi-plus" class="p-button-rounded mr-2 mb-2" />
                                </router-link>
                            </div>
                        </template>
                    </Column>

                    <Column headerStyle="min-width:10rem;">
                        <template #body="slotProps">
                            <router-link  :to="{ path: '/add-lesson', query: { lessonId:slotProps.data.id,chapterId,edit:true  }}">
                                <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" />
                            </router-link>
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
