<template>
    <div class="error-page">
        <h1>Упс! Что-то пошло не так!</h1>
        <p>{{ error.message || "Неизвестная ошибка" }}</p>
    </div>
</template>

<script setup>
const error = useError();
</script>

<style>
.error-page {
    text-align: center;
    margin-top: 50px;
}
</style>
