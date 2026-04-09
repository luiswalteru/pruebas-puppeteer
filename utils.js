function haveSignature(signature) {
  let have = true;

  if (
    signature?.signature_images &&
    !signature?.signature_images[0]?.url &&
    !signature?.name &&
    !signature?.title
  ) {
    have = false;
  }

  return have;
}

module.exports = {
  haveSignature,
};
