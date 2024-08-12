<script setup lang="ts">
    import LoginForm from "~/components/admin/LoginForm.vue";

    definePageMeta({
        middleware: () => {
            const token = useCookie('token')
            if (token.value) {
                return navigateTo('/admin/dashboard')
            }
        },
    });
</script>

<template>
    <div class="page">
        <div class="container">
            <LoginForm />
        </div>
    </div>
</template>

<style scoped lang="scss">
    .page {

    }
</style>