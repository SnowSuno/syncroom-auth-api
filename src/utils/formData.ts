export const formData = (data: Record<string, any>): FormData => {
  const form = new FormData();
  for (const key in data) {
    form.append(key, data[key]);
  }
  return form;
}
