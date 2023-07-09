//  use from validation
const ValidationUtils = {
  name: {
    required: "Name is required",
  },
  phone: {
    required: {
      value: true,
      message: "Phone is required",
    },
    pattern: {
      value: /^[0-9]{10}$/,
      message: "Phone number is not valid",
    },
  },
  email: {
    required: {
      value: true,
      message: "Email is required",
    },
    pattern: {
      value: "/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/",
      message: "Email is not valid",
    },
  },

  // textile fields validation
  productName: {
    required: {
      value: true,
      message: "Product Name is required",
    },
    pattern: {
      value: /^[a-zA-Z0-9._-]+{5,24}$/,
    },
  },

  ProductSubtitle: {
    required: {
      value: true,
      message: "Product Name is required",
    },
    pattern: {
      value: "/^[a-zA-Z0-9._-]+{5,24}$/",
    },
  },
  ProductDescription: {
    required: {
      value: true,
      message: "Product Name is required",
    },
    pattern: {
      value: "/^[a-zA-Z0-9._-]+{10,350}$/",
    },
  },
  color: {
    required: {
      value: true,
      message: "Color is required",
    },
  },
  size: {
    required: {
      value: true,
      message: "Size is required",
    },
    pattern: {
      value: "/^[a-zA-Z]+{1,4}$/",
    },
  },
  GST: {
    required: {
      value: true,
      message: "GST is required",
    },
    pattern: {
      value: "/^[0-9]+{1,2}$/",
    },
  },
  productIdType: {
    required: {
      value: true,
      message: "Product Id Type is required",
    },
    pattern: {
      value: "/^#[0-9]{4}$/",
    },
  },
  pricePerUnit: {
    required: {
      value: true,
      message: "Price Per Unit is required",
    },
    pattern: {
      value: "/^[0-9]+{1,10}$/",
    },
  },
  discountedPrice: {
    required: {
      value: true,
      message: "Discounted Price is required",
    },
    pattern: {
      value: "/^[0-9]+{1,10}$/",
    },
  },
  minOrderQuantity: {
    required: {
      value: true,
      message: "Min Order Quantity is required",
    },
    pattern: {
      value: "/^[1-9]+{1,8}$/",
    },
  },
  maxOrderQuantity: {
    required: {
      value: true,
      message: "Max Order Quantity is required",
    },
    pattern: {
      value: "/^[0-9]+{1,8}$/",
    },
  },
  minSampleOdrerQuantity: {
    required: {
      value: true,
      message: "Min Sample Order Quantity is required",
    },
    pattern: {
      value: "/^[0-9]+{1,8}$/",
    },
  },
  priceOfSample: {
    required: {
      value: true,
      message: "Price Of Sample is required",
    },
    pattern: {
      value: "/^[0-9]+{1,10}$/",
    },
  },
  otherCostIfApplicable: {
    required: {
      value: false,
      message: "Other Cost If Applicable is required",
    },
    pattern: {
      value: "/^[0-9]+{1,10}$/",
    },
  },
  reasonOfCost: {
    required: {
      value: false,
      message: "Reason Of Cost is required",
    },
    pattern: {
      value: "/^[a-zA-Z0-9._-]+{10,350}$/",
    },
  },
  selectBestFeature: {
    required: {
      value: true,
      message: "Select Best Feature is required",
    },
  },
  selectFeatureDescription: {
    required: {
      value: true,
      message: "Select Feature Description is required",
    },
    pattern: {
      value: "/^[a-zA-Z0-9._-]+{10,350}$/",
    },
  },
  productPickUpLocation: {
    required: {
      value: true,
      message: "Product Pick Up Location is required",
    },
  },
  pickUpLocationPincode: {
    required: {
      value: true,
      message: "Pick Up Location Pincode is required",
    },
    pattern: {
      value: "/^[0-9]{6}$/",
    },
  },
  productWarranty: {
    required: {
      value: true,
      message: "Warranty is required",
    },
    pattern: {
      value: "/^[0-9]+{1,3}$/",
    },
  },
  productGuarantee: {
    required: {
      value: true,
      message: "Guarantee is required",
    },
    pattern: {
      value: "/^[0-9]+{1,3}$/",
    },
  },
  productHeight: {
    required: {
      value: true,
      message: "Product Height is required",
    },
    pattern: {
      value: "/^[0-9]+{1,7}$/",
    },
  },
  productLength: {
    required: {
      value: true,
      message: "Product Length is required",
    },
    pattern: {
      value: "/^[0-9]+{1,7}$/",
    },
  },
  productBreadthOrWidth: {
    required: {
      value: true,
      message: "Product Breadth Or Width is required",
    },
    pattern: {
      value: "/^[0-9]+{1,7}$/",
    },
  },
  weightBeforePackaging: {
    required: {
      value: true,
      message: "Weight Before Packaging is required",
    },
    pattern: {
      value: "/^[0-9]+{1,13}$/",
    },
  },
  weightAfterPackaging: {
    required: {
      value: true,
      message: "Weight After Packaging is required",
    },
    pattern: {
      value: "/^[0-9]+{1,13}$/",
    },
  },
  productTags: {
    required: {
      value: true,
      message: "Product Tags is required",
    },
  },
  productImagesOrVideos: {
    required: {
      value: true,
      message: "Product Images Or Videos is required",
    },
  },
  productListingDays: {
    required: {
      value: true,
      message: "Product Listing Days is required",
    },
  },

  // hotels fields validation
  roomType: {
    required: {
      value: true,
      message: "Room Type is required",
    },
  },
  validityOfVoucher: {
    required: {
      value: true,
      message: "Validity Of Voucher is required",
    },
    pattern: {
      value: "/^[0-9]+{1,3}$/",
    },
  },
  inclusions: {
    required: {
      value: true,
      message: "Inclusions is required",
    },
    pattern: {
      value: "/^[a-zA-Z0-9._-]+{10,500}$/",
    },
  },
  exclusions: {
    required: {
      value: true,

      message: "Exclusions is required",
    },
    pattern: {
      value: "/^[a-zA-Z0-9._-]+{10,500}$/",
    },
  },
  termsAndConditions: {
    required: {
      value: true,
      message: "Terms And Conditions is required",
    },
    pattern: {
      value: "/^[a-zA-Z0-9._-]+{10,500}$/",
    },
  },
  redemptionSteps: {
    required: {
      value: true,
      message: "Redemption Steps is required",
    },
  },
  adress: {
    required: {
      value: true,
      message: "Adress is required",
    },
    pattern: {
      value: "/^[a-zA-Z0-9._-]+{10,20}$/",
    },
  },
  area: {
    required: {
      value: true,
      message: "Area is required",
    },
    pattern: {
      value: "/^[a-zA-Z0-9._-]+{10,50}$/",
    },
  },
  landmark: {
    required: {
      value: true,
      message: "Landmark is required",
    },
    pattern: {
      value: "/^[a-zA-Z0-9._-]+{10,50}$/",
    },
  },
  city: {
    required: {
      value: true,
      message: "City is required",
    },
    pattern: {
      value: "/^[a-zA-Z0-9._-]+{10,50}$/",
    },
  },
  state: {
    required: {
      value: true,
      message: "State is required",
    },
    pattern: {
      value: "/^[a-zA-Z0-9._-]+{10,50}$/",
    },
  },
  uploadMultipleLocation: {
    required: {
      value: false,
      // message: "Upload Multiple Location is required",
    },
    pattern: {
      value: "/.(jpg|jpeg|png|gif)$/i",
    },
  },
  customMessage: {
    required: {
      value: true,
      message: "Custom Message is required",
    },
    pattern: {
      value: "/^[a-zA-Z0-9._-]+{10,500}$/",
    },
  },

  // sample mobility fields validation
  registrationDetails: {
    required: {
      value: true,
      message: "Registration Details is required",
    },
    pattern: {
      value: "/^[a-zA-Z0-9._-]+{10,500}$/",
    },
  },
  taxesDetails: {
    required: {
      value: true,
      message: "Taxes Details is required",
    },
    pattern: {
      value: "/^[a-zA-Z0-9._-]+{10,500}$/",
    },
  },
  insuranceDetails: {
    required: {
      value: true,
      message: "Insurance Details is required",
    },
    pattern: {
      value: "/^[a-zA-Z0-9._-]+{10,500}$/",
    },
  },
  packagingAndDeliveryInstructions: {
    required: {
      value: true,
      message: "Packaging And Delivery Instructions is required",
    },
    pattern: {
      value: "/^[a-zA-Z0-9._-]+{10,500}$/",
    },
  },
  instructionsToUseProduct: {
    required: {
      value: true,
      message: "Instructions To Use Product is required",
    },
    pattern: {
      value: "/^[a-zA-Z0-9._-]+{10,500}$/",
    },
  },

  // electronics fields validation
  manufacturingDate: {
    required: {
      value: true,
      message: "Manufacturing Date is required",
    },
  },
  expiryDate: {
    required: {
      value: true,
      message: "Expiry Date is required",
    },
  },
  modelName: {
    required: {
      value: true,
      message: "Model Name is required",
    },
    pattern: {
      value: "/^[a-zA-Z0-9._-]+{10,100}$/",
    },
  },

  // no extra field validation in lifestyle, officesupply

  // media field validations
  mediaName: {
    required: {
      value: true,
      message: "Media Name is required",
    },
    pattern: {
      value: "/^[a-zA-Z0-9._-]+{10,100}$/",
    },
  },
  offeringThisBrandAt: {
    required: {
      value: true,
      message: "Offering This Brand At is required",
    },
    // pattern: {
    //   value: /^[a-zA-Z0-9._-]+{10,100}$/,
    // },
  },
  mediaLocation: {
    required: {
      value: true,
      message: "Media Location is required",
    },
    pattern: {
      value: "/^[a-zA-Z0-9._-]+{10,100}$/",
    },
  },
  mediaUnit: {
    required: {
      value: true,
      message: "Media Unit is required",
    },
  },
  mediaTimeLine: {
    required: {
      value: true,
      message: "Media TimeLine is required",
    },
  },
  mediaRepetition: {
    required: {
      value: true,
      message: "Media Repetition is required",
    },
    pattern: {
      value: "/^[0-9]+{10,100}$/",
    },
  },
  displaySize: {
    required: {
      value: true,
      message: "Display/Dimension Size is required",
    },
  },
  mediaRegion: {
    required: {
      value: true,
      message: "Region is required",
    },
    pattern: {
      value: "/^[a-zA-Z0-9._-]+{10,100}$/",
    },
  },
  mediaState: {
    required: {
      value: true,
      message: "State is required",
    },
    pattern: {
      value: "/^[a-zA-Z]+{10,30}$/",
    },
  },
  mediaCity: {
    required: {
      value: true,
      message: "City is required",
    },
    pattern: {
      value: "/^[a-zA-Z]+{10,30}$/",
    },
  },
  mediaLandmark: {
    required: {
      value: true,
      message: "Landmark is required",
    },
    pattern: {
      value: "/^[a-zA-Z]+{10,30}$/",
    },
  },
  dimensionOfContent: {
    required: {
      value: true,
      message: "Dimension Of Content is required",
    },
    pattern: {
      value: "/^[a-zA-Z]+{10,30}$/",
    },
  },
  contentUploadLink: {
    required: {
      value: true,
      message: "Content Upload Link is required",
    },
  },
};

export default ValidationUtils;
