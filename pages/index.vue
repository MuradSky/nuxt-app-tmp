<script setup lang="ts">
    import type {FormSubmitEvent} from "#ui/types";
    import { object, string, type InferType } from 'yup'

    const schema = object({
        email: string().email('Invalid email').required('Required'),
        username: string().required('Required'),
        message: string(),
    })

    type Schema = InferType<typeof schema>

    const state = reactive({
        username: undefined,
        email: undefined,
        message: undefined,
        isLoading: false,
    })

    const submit = async (e: FormSubmitEvent<Schema>) => {
        state.isLoading = true
        try {
            await $fetch('/api/client/application', {
                method: 'post',
                body: {
                    username: e.data.username,
                    message: e.data.message,
                    email: e.data.email,
                }
            })
            state.username = state.email = state.message = undefined
        } catch (err) {

        } finally {
            state.isLoading = false
        }
    }
</script>

<template>
    <div class="block">
        <h1>Заявка</h1>
        <div class="inner">
            <UForm :schema="schema" :state="state" @submit.prevent="submit" class="space-y-4">
                <UFormGroup label="Ваше имя" name="username">
                    <UInput v-model="state.username" />
                </UFormGroup>

                <UFormGroup label="Ваш емейл" name="email">
                    <UInput v-model="state.email" />
                </UFormGroup>

                <UFormGroup label="Ваше сообщение" nome="message">
                    <UTextarea v-model="state.message" />
                </UFormGroup>

                <UButton type="submit" :loading="state.isLoading">
                    Submit
                </UButton>
            </UForm>
        </div>
    </div>
</template>

<style scoped>
.block {
    width: 100%;
    max-width: 500px;
    margin: 100px auto;
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