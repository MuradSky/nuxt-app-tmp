<script setup lang="ts">
    import SideMenu from "~/components/admin/SideMenu.vue"
    import Header from "~/components/admin/Header.vue"
    const token = useCookie('token')

    if (!token.value) {
        navigateTo('/admin')
    } else {
        try {
            await $fetch('/api/admin/profile', {
                headers: {
                    Authorization: `Bearer ${token.value}`
                }
            })
        } catch (err) {
            token.value = null
            navigateTo('/admin')
        }
    }
</script>

<template>
    <div class="admin-page">
        <SideMenu />
        <div class="wrap">
            <Header />
            <div class="content">
                <slot />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .admin-page {
        background: rgb(15 23 42 / 1);
        min-height: 100vh;
        display: flex;
    }

    .wrap {
        flex: auto;
    }

    .content {

        padding: 15px 32px;
    }
</style>