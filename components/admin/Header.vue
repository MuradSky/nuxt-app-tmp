<script setup lang="ts">
    const accessToken = ref(useCookie('token'))
    const loading = ref(false)

    const logOut = async () => {
        loading.value = true
        !!accessToken.value && await $fetch('/api/admin/logout', {
            method: 'delete',
            headers: {
                Authorization: `Bearer ${accessToken.value}`
            }
        })
        accessToken.value = null
        loading.value = false
        navigateTo('/admin')
    }
</script>

<template>
    <header class="header">
        <NuxtLink href="/" target="_blank">Go To App</NuxtLink>
        <UButton @click="logOut" :loading="loading" >
            Logout
        </UButton>
    </header>
</template>

<style scoped lang="scss">
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 32px;
        border-bottom: 1px solid rgb(255 255 255 / .4);
    }
</style>