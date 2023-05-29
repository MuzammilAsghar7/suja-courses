<script setup>
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount } from 'vue';
import UserService from '@/service/UserService';
import { useToast } from 'primevue/usetoast';
import { useLayout } from '@/layout/composables/layout';
import { useStore } from 'vuex';

// import axios from 'axios';
const toast = useToast();
const { contextPath } = useLayout();
const store = useStore();
const editCourse = ref(false);
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const user = ref({});
const loading = ref(true)
const dt = ref(null);
const filters = ref({});
const submitted = ref(false);
const users = ref(null);
const userService = new UserService();
const fileSelect = async (event) => {
    console.log(await event.files[0]);
    chapter.value.file = await event.files[0];
}
const getAllUser = () => { 
    userService.getAllUsers().then((data) => {users.value = data.users; loading.value=false; console.log(data)});
}

onBeforeMount(() => {
    initFilters();
});
onMounted(async () => {
    getAllUser();
});
const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const openNew = () => {
    user.value = {};
    editCourse.value = false;
    submitted.value = false;
    productDialog.value = true;
};

const hideDialog = () => {
    productDialog.value = false;
    submitted.value = false;
};

const saveUser = () => {
    submitted.value = true;
    let errors = [];
    if(!user.value.name || !user.value.email || !user.value.password || !user.value.c_password){
        toast.add({ severity: 'error', summary: 'Empty Fields', detail: 'Please fill out all fields.', life: 3000 });
        return false;
    }

    if(user.value.password != user.value.c_password){
        toast.add({ severity: 'error', summary: 'Password Error', detail: 'Password and Confirm Password must be same.', life: 3000 });
        return false;
    } 

    if(editCourse.value){
       
        userService.updateUser(chapter.value).then((response) => { 
            if(response.status){
                toast.add({ severity: 'success', summary: 'Updated', detail: 'User Updated Successfully!.', life: 3000 });
                hideDialog();
                getAllUser();
            }else
            {
                let errorKey = Object.keys(response.error);
                toast.add({ severity: 'error', summary: response.error[errorKey][0], detail: response.erorr, life: 3000 });
            }
        });

    }else
    {
        userService.addUser(user.value).then((response) => { 
            if(response.status){
                toast.add({ severity: 'success', summary: 'User Saved', detail: 'User added Successfully!', life: 3000 });
                hideDialog();
                getAllUser();
            }else
            {
                let errorKey = Object.keys(response.error);
                toast.add({ severity: 'error', summary: response.error[errorKey][0], detail: response.erorr, life: 3000 });
            }
        });
    }
};
const editProduct = (User) => {
    console.log(User);
    user.value = User;
    editCourse.value = true;
    productDialog.value = true;
};

const confirmDeleteProduct = (editProduct) => {
    console.log(editProduct);
    chapter.value = editProduct;
    deleteProductDialog.value = true;
};

const deleteProduct = () => {
    deleteProductDialog.value = false;
    chapter.value = {};
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
};


const confirmDeleteSelected = () => {
    deleteProductsDialog.value = true;
};
const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};
</script>

<template>
    <div class="grid">
        <!-- <pre>
        {{  user  }}
    </pre> -->
        <div class="col-12">
            <div class="card" style="min-height: 374px;">

                <Toast />
                <Toolbar class="mb-4">
                    <template v-slot:start>
                        <div class="my-2">
                            <Button label="New User" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
                        </div>
                    </template>
                </Toolbar>

                <DataTable
                   
                    ref="dt"
                    :value="users"
                    :loading="loading"
                >
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
                
                <Column field="name" header="Name" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                    <template #body="slotProps">
                        <span class="p-column-title">Name</span>
                        {{ slotProps.data.name }}
                    </template>
                </Column>
                <Column field="email" header="Email">
                    <template #body="slotProps">
                          {{ slotProps.data.email }}
                    </template>
                </Column>
                <!-- <Column field="status" header="Status" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                    <template #body="slotProps">
                        <span class="p-column-title">Status</span>
                        <span :class="'product-badge status-' + (slotProps.data.status == 1 ? 'Enabled' : 'Disabled')">{{ slotProps.data.status == 1 ? "Enabled" : 'Disabled' }}</span>
                    </template>
                    </Column> -->

                    <Column headerStyle="min-width:10rem;">
                        <template #body="slotProps">
                            <!-- <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editProduct(slotProps.data)" /> -->
                            <!-- <Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2" @click="confirmDeleteProduct(slotProps.data)" /> --> 
                        </template>
                    </Column>
                </DataTable>

                <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Add new user" :modal="true" class="p-fluid">
                    <div class="field">
                        <label for="name">Name</label>
                        <InputText id="name" v-model.trim="user.name" required="true" autofocus :class="{ 'p-invalid': submitted && !user.name }" />
                        <small class="p-invalid" v-if="submitted && !user.name">Name is required.</small>
                    </div>

                    <div class="field">
                        <label for="name">Email</label>
                        <InputText id="name" v-model.trim="user.email" required="true" autofocus :class="{ 'p-invalid': submitted && !user.email }" />
                        <small class="p-invalid" v-if="submitted && !user.email">Email is required.</small>
                    </div>

                    <div class="field">
                        <label for="name">Password</label>
                        <Password v-model.trim="user.password" toggleMask :class="{ 'p-invalid': submitted && !user.password }" />
                        <small class="p-invalid" v-if="submitted && !user.password">Password is required.</small>
                    </div>

                    <div class="field">
                        <label for="name">Confirm Password</label>
                        <Password v-model="user.c_password" toggleMask :feedback="false" v-model.trim="user.c_password" required="true" autofocus :class="{ 'p-invalid': submitted && !user.c_password }" />
                        <small class="p-invalid" v-if="submitted && !user.c_password">Confirm Password is required.</small>
                    </div>

                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
                        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveUser" />
                    </template>
                </Dialog>

                 <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="course"
                            >Are you sure you want to delete <b>{{ course.title }}</b
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
