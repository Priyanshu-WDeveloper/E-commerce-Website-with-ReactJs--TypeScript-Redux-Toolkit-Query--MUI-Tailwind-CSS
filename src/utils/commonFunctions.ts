// import { useErrorToast, useToast } from "../helpers/toasts/useToast";

export const handleDelete = async (
  deleteById,
  selectedId,
  getAllData,
  showToast,
  showError
) => {
  console.log(selectedId);

  if (selectedId) {
    try {
      const res = await deleteById({ id: selectedId }).unwrap();
      if (res?.statusCode === 200) {
        showToast(`Deleted Successfully`);
        if (getAllData) {
          getAllData(); // Assuming getAllData is a function to fetch updated data
        }
      }
    } catch (error) {
      console.error(error);

      showError(error?.data?.message || "");
    }
  }
};
