<template>
    <div class="admin-course-general__info oilcase__setting-container">
        <div class="admin-course-id__main-settings__info__field" v-for="info in course_setting.course_info.slice(0, 2)" :key="info">
            <h3 class="admin-course-id__main-settings__info__field__title">{{ info.title }}</h3>
            <input-cmp 
                :input_label="info.label"
                :input_value="info.text"
            />
        </div>
        <div class="admin-course-id__main-settings__info__field" v-for="info in course_setting.course_info.slice(2)" :key="info">
            <h3 class="admin-course-id__main-settings__info__field__title">{{ info.title }}</h3>
            <textarea-cmp 
                :textarea_label="info.label"
                :textarea_value="info.text"
            />
        </div>
    </div>
    <btn-cmp 
        v-if="!edit_mod.value"
        class="admin-course-id__main-settings__edit"
        :btn_text="'Редактировать'"
        @click="openEditBlock(true)"
    />
    <div v-else class="admin-course-id__main-settings__btns">
        <btn-cmp 
            v-if="edit_mod.value"
            class="admin-course-id__main-settings__edit"
            :btn_text="'Отмена'"
            :btn_type="'secondary'"
            @click="openEditBlock(false)"
        />
        <btn-cmp 
            v-if="edit_mod.value"
            class="admin-course-id__main-settings__edit"
            :btn_text="'Сохранить'"
        />
    </div>
</template>
