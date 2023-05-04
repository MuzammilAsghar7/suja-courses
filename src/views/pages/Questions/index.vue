<script setup>
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount } from 'vue';
import LessonService from '@/service/LessonService.js';
import { useToast } from 'primevue/usetoast';
import { useLayout } from '@/layout/composables/layout';
import axios from 'axios';

const toast = useToast();
const { contextPath } = useLayout();

const products = ref(null);
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const selectedProducts = ref(null);
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
    lessonService.getAllQuestions().then((data) => { questions.value = data.questions});
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

                    <template v-slot:end>
                        <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block" />
                        <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)" />
                    </template>
                </Toolbar>

                <DataTable
                    ref="dt"
                    :value="questions"
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
                <Column field="id" header="ID">
                    <template #body="slotProps">
                        <span class="font-bold pl-4">{{ slotProps.data.id }}</span>
                    </template>
                </Column>
                <Column field="name" header="Title" :sortable="true" headerStyle="width:14%; min-width:10rem;">
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
                <Column field="content" header="Content">
                    <template #body="slotProps">
                        <div class="py-3"
                        v-html="slotProps.data.content.substring(0, 160)+' ...'"></div>
                    </template>
                 </Column>

                    <Column headerStyle="min-width:10rem;">
                        <template #body="slotProps">
                            <router-link  :to="{ path: 'add-question', query: { questionId:slotProps.data.id  }}">
                               <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" />
                            </router-link>
                            <router-link  to="add-question">
                               <Button icon="pi pi-plus" class="p-button-rounded p-button-success mr-2" />
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