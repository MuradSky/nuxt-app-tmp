<script setup lang="ts">
    import { io, type Socket } from "socket.io-client"
    const route = useRoute()
    const path = ref(route.path)

    let socket: Socket | undefined
    const appCount = ref(0)
    onMounted(()=> {
        socket = io(`${location.protocol === 'https' ? 'wss://' : 'ws://'}${location.host}`)
        socket.on('appsCount', (count: any) => {
            try {
                appCount.value = count
            } catch (e) {
                console.error(e)
            }
        })
    })

    onUnmounted(()=> {
        socket?.disconnect()
    })

    watch(()=> route.path, (val)=> {
        path.value = val
    })
</script>

<template>
    <menu class="menu">
        <div class="menu-head">Super Admin</div>

        <ul class="menu-list">
            <li class="menu-list-item" :class="{ is_active: path.includes('dashboard') }">
                <NuxtLink to="/admin/dashboard">Dashboard</NuxtLink>
            </li>

            <li class="menu-list-item" :class="{ is_active: path.includes('applications') }">
                <NuxtLink to="/admin/applications">Заявки <UBadge>{{ appCount }}</UBadge></NuxtLink>
            </li>
        </ul>
    </menu>
</template>

<style scoped lang="scss">
    .menu {
        min-height: 100vh;
        max-width: 260px;
        min-width: 260px;
        background-color: rgb(30 41 59 / .6);
    }

    .menu-head {
        padding: 17.5px 12px;
        text-align: center;
        background-color: rgb(0 220 130 / 1);
        color: rgb(15 23 42);
        margin-bottom: 12px;
    }

    .menu-list {
        display: flex;
        flex-direction: column;
        padding: 0 5px;
    }

    .menu-list-item.is_active a {
        color: rgb(0 220 130 / 1) !important;
    }
    .menu-list-item a {
        display: flex;
        justify-content: space-between;
        padding: 12px;
        color: rgb(255 255 255 / .3);
        border-left: 1px solid currentColor;
        transition: .2s linear;

        &:hover {
            color: #fff;
        }
    }
</style>