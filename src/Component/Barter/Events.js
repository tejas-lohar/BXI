import axios from "axios";
export default class CustomEvents {
  static Events = {
    PREFERENCE: "PREFERENCE",
    PRODUCT: "PRODUCT",
    SEARCH: "SEARCH",
    CART: "CART",
  };

  static emit = async (EventName, data) => {
    alert(EventName);

    try {
      await axios.post(
        "/events",
        { event: EventName, data },
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      return error;
    }
  };

  static Search = async (search, name, tags) => {
    await this.emit(this.Events.SEARCH, { name, search, tags });
  };

  static Prefrence = async (name, tags) => {
    await this.emit(this.Events.PREFERENCE, { name, tags });
  };

  static Product = async (name, price, tags, category, url, image) => {
    await this.emit(this.Events.PRODUCT, {
      name,
      price,
      tags,
      category,
      url,
      image,
    });
  };

  static Cart = async (
    name,
    productname,
    price,
    category,
    url,
    image,
    tags
  ) => {
    await this.emit(this.Events.CART, {
      name,
      productname,
      price,
      category,
      url,
      image,
      tags,
    });
  };
}
