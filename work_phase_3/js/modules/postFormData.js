// js/modules/postFormData.js
export default async function postFormData(
    formEl,
    endpointUrl,
    customHeaders = {}
) {
    try {
        const formData = new FormData(formEl);
        const res = await fetch(endpointUrl, {
            method: "POST",
            headers: customHeaders,
            body: formData,
        });

        let data;
        try {
            data = await res.json();
        } catch {
            data = { message: res.ok ? "OK" : "Server returned no JSON" };
        }

        const ok =
            res.ok &&
            ((typeof data.status === "string" &&
                data.status.toLowerCase() === "success") ||
                data.success === true);

        return { success: ok, data };
    } catch (error) {
        return {
            success: false,
            data: { message: "Network or server error.", error },
        };
    }
}
