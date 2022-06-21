/** get tw array photographers and medias **/

export default class DataAPI {
  async getData() {
    let path = "../data/photographers.json";
    //Read the json data
    let response = await fetch(path);
    let data = await response.json();

    //Split json in half
    const dataPhotographers = [...data.photographers];
    const dataMedias = [...data.media];

    return {
      photographers: dataPhotographers,
      medias: dataMedias,
    };
  }
}
