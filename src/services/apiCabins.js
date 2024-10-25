import supabase, { supabaseUrl } from "./supabase";

// THE GET CABINS FUNCTION
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded!🤣");
  }

  return data;
}

// THE ADDING FUNCTION TO THE DATABBASE
export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = hasImagePath
    ? newCabin.image
    : `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

  // IMAGE PATH FOR THE SUPABASE DATABASE
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin_images/${imageName}`;

  // 1:::: CREATE/EDIT THE CABIN
  let query = supabase.from("cabins");

  // A:: FOR CREATE THE CABIN
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B:: FOR EDIT THE CABIN
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be Created!🤣");
  }

  // THEN UPLOAD THE IMAGE

  if (hasImagePath) {
    return data;
  }

  // .from("cabin-images")
  const { error: storageError } = await supabase.storage
    .from("cabin_images")
    .upload(imageName, newCabin.image);

  // 3:::: PREVENT THE CABIN IF THERE WAS AN ERROR
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);

    console.error(storageError);
    throw new Error(
      "Cabin image has been deleted, and the cabin was not created!🤣"
    );
  }
  return data;
}

// THE DELETE CABINS FUNCTION
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be Deleted!🤣");
  }

  return data;
}
