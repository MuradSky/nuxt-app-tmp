<script setup lang="ts">
    import { object, string, type InferType } from 'yup'
    import type { FormSubmitEvent } from "#ui/types"

    const schema = object({
        email: string().email('Invalid email').required('Required'),
        password: string()
            .min(8, 'Must be at least 8 characters')
            .required('Required')
    })
    type Schema = InferType<typeof schema>

    const state = reactive({
        email: undefined,
        password: undefined,
        error: undefined,
        isLoading: false,
    })

    watch(()=> state.email, ()=> {
        state.error = undefined
    })

    watch(()=> state.password, ()=> {
        state.error = undefined
    })

    const onSubmit = async (e: FormSubmitEvent<Schema>) => {
        state.isLoading = true
        try {
            await $fetch('/api/admin/login', {
                method: 'post',
                body: {
                    email: e.data.email,
                    password: e.data.password
                },
            })
            navigateTo('/admin/dashboard')
        } catch (e: any) {
            state.error = e.data.message
        } finally {
            state.isLoading = false
        }
    }

</script>

<template>
    <div class="block">
        <h1>Авторизация</h1>
        <div class="inner">
            <UForm :schema="schema" :state="state" class="space-y-4" @submit.prevent="onSubmit">
                <UFormGroup label="Email" name="email" :error="!!state.error">
                    <UInput v-model="state.email" color="primary"  />
                </UFormGroup>
                <UFormGroup label="Password" name="password" :error="!!state.error">
                    <UInput v-model="state.password" type="password"   color="primary" />
                </UFormGroup>
                <div class="error" v-if="state.error">{{ state.error }}</div>
                <UButton type="submit" :loading="state.isLoading">
                    Submit
                </UButton>
            </UForm>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .block {
        width: 100%;
        max-width: 380px;
        margin: 0 auto;
        padding-top: 200px;
    }

    h1 {
        font-size: 32px;
        color: #fff;
        margin-bottom: 15px;
    }

    .inner {
        padding: 32px;
        border-radius: 10px;
        border: 1px solid #ccc;
    }

    .error {
        font-size: 10px;
        color: #dc3545;
    }
</style>