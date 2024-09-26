export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.config.errorHandler = (err: unknown, vm, info) => {
        if (err instanceof Error) {
            console.error(
                `Ошибка в компоненте: ${err.message}\nИнформация: ${info}`
            );
        } else {
            console.error(
                `Неизвестная ошибка: ${JSON.stringify(
                    err
                )}\nИнформация: ${info}`
            );
        }
    };

    window.onerror = (message, source, lineno, colno, error) => {
        console.error(
            `Глобальная ошибка: ${message} в ${source}:${lineno}:${colno}`,
            error
        );
    };

    window.onunhandledrejection = (event) => {
        console.error("Непойманное обещание (Promise):", event.reason);
    };
});
