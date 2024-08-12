<script setup lang="ts">
    definePageMeta({ layout: 'admin' })

    const tokens = useCookie('token')
    const data = ref<any>(null)

    data.value = await $fetch('/api/admin/dashboard', {
        headers: {
            Authorization: `Bearer ${tokens.value}`
        }
    })
</script>

<template>
    <h1>Dashboard</h1>
    <ul class="grid">
        <li class="item" v-for="item in data" :key="item.name">
            <NuxtLink class="card" :href="item.path">
                <h4>{{ item.name }}</h4>
                <p>кол-во: {{ item.count }}</p>
            </NuxtLink>
        </li>
    </ul>
</template>

<style scoped lang="scss">
    .grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 32px;
    }


    .card {
        display: block;
        border: 1px solid rgb(255 255 255 / .3);
        border-radius: 10px;
        padding: 24px;
        transition: all .2s linear;
        &:hover {
            color: rgb(0 220 130 / 1);
            border-color: rgb(0 220 130 / 1);
        }

        h4 {
            margin-bottom: 24px;
        }

        p {
            font-size: 10px;
        }
    }
</style>