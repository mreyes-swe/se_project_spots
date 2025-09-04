function updateButtonLoadingText(Button, isLoading) {
  if (Button.textContent.startsWith("Sav")) {
    Button.textContent = isLoading ? "Saving..." : "Save";
  } else if (Button.textContent.startsWith("Delet")) {
    Button.textContent = isLoading ? "Deleting..." : "Delete";
  }
}

export default updateButtonLoadingText;
