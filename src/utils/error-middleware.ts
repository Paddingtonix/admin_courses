export default function ({ error }: { error: Error }) {
	if (process.client) {
		window.addEventListener("error", (event: ErrorEvent) => {
			console.error("Клиентская ошибка:", event.error || event.message);
		});

		window.addEventListener(
			"unhandledrejection",
			(event: PromiseRejectionEvent) => {
				console.error(
					"Необработанное отклонение промиса:",
					event.reason
				);
			}
		);
	}

	if (process.server) {
		console.error("Серверная ошибка:", error);
	}
}
