<script setup lang="ts">
    import { io, type Socket } from "socket.io-client"
    definePageMeta({ layout: 'admin' })
    let socket: Socket | undefined
    const data = ref<any>()

    onMounted(()=> {
        socket = io(`${location.protocol === 'https' ? 'wss://' : 'ws://'}${location.host}`)
        socket.on('applications', (apps: any) => {
            try {
                if (typeof apps !== 'string') {
                    data.value = apps
                }
            } catch (e) {
                console.error(e)
            }
        })
    })

    onUnmounted(()=> {
        socket?.disconnect()
    })

    const tokens = useCookie('token')

    data.value = await $fetch('/api/admin/applications', {
        headers: {
            Authorization: `Bearer ${tokens.value}`
        }
    })

    const columns = [
        {
            key: 'id',
            label: 'ID'
        },
        {
            key: 'username',
            label: 'Имя'
        },
        {
            key: 'email',
            label: 'Email'
        }
    ]
</script>

<template>
    <h1>{{ data.title }}</h1>

    <div class="table">
        <UTable :columns="columns" :rows="data.data" />
    </div>
</template>

<style scoped lang="scss">
    .table {
        width: 100%;
    }
</style>