<script setup lang="ts">
    const { id } = useRoute().params
    const accessToken = ref(useCookie('token'))
    const application = ref<any>(null)

    if (accessToken) {
        try {
            const data = await $fetch('/api/admin/applications/'+id, {
                headers: {
                    Authorization: `Bearer ${accessToken.value}`
                }
            })

            application.value = data.data[0]
        } catch (err) {
            navigateTo('/admin')
        }
    } else {

    }

    const deleteItem  = async (id: number) => {
        try {
            await $fetch('/api/admin/applications/'+id, {
                method: 'delete',
                headers: {
                    Authorization: `Bearer ${accessToken.value}`
                }
            })
            navigateTo('/admin')
        } catch (err) {

        }
    }

    console.log(application)
</script>

<template>
    <div class="container block" v-if="application">
        <NuxtLink href="/admin" class="btn btn-link" >Назад</NuxtLink>
        <h5>ID: {{ application.id }}</h5>
        <h2>Username: {{ application.username }}</h2>
        <p>Email: {{ application.email }}</p>
        <p class="message">Message {{ application.message }}</p>

        <button class="btn btn-danger" @click="deleteItem(application.id)">Удалить</button>
    </div>
</template>

<style scoped lang="scss">
    .block {
        padding-top: 100px;
    }

    .btn {
        margin-bottom: 24px;
    }

    .message {
        padding: 15px;
        min-height: 100px;
        border: 1px solid;
        border-radius: 10px;
    }
</style>