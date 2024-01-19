import main_page from "./pages/main_page.vue"
import course_page from "./pages/course-page/course-page.vue"

const routes = [
    {
        path: '/',
        name: 'main',
        component: main_page
    },
    {
        path: '/course',
        name: 'course',
        component: course_page
    }
]

export default routes