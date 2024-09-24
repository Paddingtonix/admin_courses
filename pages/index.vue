<template>
	<div class="oil-main">
		<NuxtLayout name="default">
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
	setup () {
		const route = useRoute()
		const router = useRouter()

		onMounted(() => {
			if(route.path === '/') {
				router.push('course-page')
			}
		})

	}
})

</script>