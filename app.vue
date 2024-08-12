<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css");

*, *::before, *::after {
    box-sizing: border-box;
}

.page-enter-active,
.page-leave-active {
    transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
    opacity: 0;
    filter: blur(.4git commit -m "first commit"rem);
}

.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
}
</style>