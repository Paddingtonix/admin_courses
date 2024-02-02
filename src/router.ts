import main_page from "./pages/main_page.vue"
import course_page from "./pages/course-page/course-page.vue"
import course_page_id from './pages/course-page/id/course-page.vue'
import course_page_id_edit from './pages/course-page/id/edit_page/edit_page.vue'

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
    },
    {
        path: '/course/:id',
        name: 'course-id',
        component: course_page_id,
        children: [
            {
                path: '/edit',
                component: course_page_id_edit
            }
        ]
    }
]

export default routes