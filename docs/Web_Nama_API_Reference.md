The Funmawebassembly library is a re-encapsulation of the CNamaSDK, with its interface declarations located within the funamawebassembly.d.ts file
```typescript

  /**
   * @brief CanvasViewport
   * @note call CanvasViewport.delete to release memory
   * 
   */
  class CanvasViewport {
    constructor(
        x_: number,
        y_: number,
        w_: number,
        h_: number,
    );

    x: number;
    y: number;
    w: number;
    h: number;

  }

  interface FUPLATFORM {
    value: number;

    /** enum values */

    /** PC */
    PC: FUPLATFORM;
    /** ANDROID */
    ANDORID: FUPLATFORM;
    /** IOS */
    IOS: FUPLATFORM;
    /** HarmonyOS */
    HarmonyOS: FUPLATFORM;
  }
    
  interface FULOGLEVEL {
    value: number;

    /** enum values */

    /** trace */
    FU_LOG_LEVEL_TRACE: FULOGLEVEL;
    /** debug */
    FU_LOG_LEVEL_DEBUG: FULOGLEVEL;
    /** info */
    FU_LOG_LEVEL_INFO: FULOGLEVEL;
    /** warn */
    FU_LOG_LEVEL_WARN: FULOGLEVEL;
    /** error */
    FU_LOG_LEVEL_ERROR: FULOGLEVEL;
    /** critical */
    FU_LOG_LEVEL_CRITICAL: FULOGLEVEL;
    /** off */
    FU_LOG_LEVEL_OFF: FULOGLEVEL;
  }
    
  interface FURENDERFEATURE {
    value: number;

    /** enum values */

    /** TRACK_FACE */
    RENDER_FEATURE_TRACK_FACE: FURENDERFEATURE;
    /** BEAUTIFY_IMAGE */
    RENDER_FEATURE_BEAUTIFY_IMAGE: FURENDERFEATURE;
    /** RENDER */
    RENDER_FEATURE_RENDER: FURENDERFEATURE;
    /** ADDITIONAL_DETECTOR */
    RENDER_FEATURE_ADDITIONAL_DETECTOR: FURENDERFEATURE;
    /** RENDER_ITEM */
    RENDER_FEATURE_RENDER_ITEM: FURENDERFEATURE;
    /** FULL */
    RENDER_FEATURE_FULL: FURENDERFEATURE;
    /** MASK */
    RENDER_FEATURE_MASK: FURENDERFEATURE;
    /** FLIP_X */
    RENDER_OPTION_FLIP_X: FURENDERFEATURE;
    /** FLIP_Y */
    RENDER_OPTION_FLIP_Y: FURENDERFEATURE;
    /** NOCLEAR_CURRENT_FRAMEBUFFER */
    NOCLEAR_CURRENT_FRAMEBUFFER: FURENDERFEATURE;
    /** FORCE_OUTPUT_ALPHA_ONE */
    RENDER_OPTION_FORCE_OUTPUT_ALPHA_ONE: FURENDERFEATURE;
    /** MASK */
    RENDER_OPTION_MASK: FURENDERFEATURE;
  }
    
  interface FUFORMAT {
    value: number;

    /** enum values */

    /** BGBA BUFFER */
    FORMAT_BGRA_BUFFER: FUFORMAT;
    /** RGBA TEXTURE */
    FORMAT_RGBA_TEXTURE: FUFORMAT;
    /** NV21 BUFFER */
    FORMAT_NV21_BUFFER: FUFORMAT;
    /** RGBA BUFFER */
    FORMAT_RGBA_BUFFER: FUFORMAT;
    /** NV12 BUFFER */
    FORMAT_NV12_BUFFER: FUFORMAT;
    /** I420 BUFFER */
    FORMAT_I420_BUFFER: FUFORMAT;
  }
    
  interface FUTRANSFORM {
    value: number;

    /** enum values */

    /** no rotation, no flip */
    DEFAULT: FUTRANSFORM;
    /** no rotation, no flip */
    CCROT0: FUTRANSFORM;
    /** counter-clockwise rotate 90 degree */
    CCROT90: FUTRANSFORM;
    /** counter-clockwise rotate 180 degree */
    CCROT180: FUTRANSFORM;
    /** counter-clockwise rotate 270 degree */
    CCROT270: FUTRANSFORM;
    /** vertical flip */
    CCROT0_FLIPVERTICAL: FUTRANSFORM;
    /** horizontal flip */
    CCROT0_FLIPHORIZONTAL: FUTRANSFORM;
    /** 90 degree and vertical flip */
    CCROT90_FLIPVERTICAL: FUTRANSFORM;
    /** 90 degree and horizontal flip */
    CCROT90_FLIPHORIZONTAL: FUTRANSFORM;
    /** CCROT180 */
    CCROT90_FLIPVERTICAL_FLIPHORIZONTAL: FUTRANSFORM;
    /** CCROT270 */
    CCROT180_FLIPVERTICAL: FUTRANSFORM;
    /** CCROT180_FLIPVERTICAL */
    CCROT180_FLIPHORIZONTAL: FUTRANSFORM;
    /** CCROT180_FLIPHORIZONTAL */
    CCROT180_FLIPVERTICAL_FLIPHORIZONTAL: FUTRANSFORM;
    /** CCROT0 */
    CCROT270_FLIPVERTICAL: FUTRANSFORM;
    /** CCROT270_FLIPVERTICAL */
    CCROT270_FLIPHORIZONTAL: FUTRANSFORM;
    /** 280 horizontal flip */
    CCROT270_FLIPVERTICAL_FLIPHORIZONTAL: FUTRANSFORM;
  }
    
  interface FUAITYPE {
    value: number;

    /** enum values */

    /** NONE */
    NONE: FUAITYPE;
    /** BACKGROUNDSEGMENTATION */
    BACKGROUNDSEGMENTATION: FUAITYPE;
    /** HAIRSEGMENTATION */
    HAIRSEGMENTATION: FUAITYPE;
    /** HANDGESTURE */
    HANDGESTURE: FUAITYPE;
    /** HANDPROCESSOR */
    HANDPROCESSOR: FUAITYPE;
    /** TONGUETRACKING */
    TONGUETRACKING: FUAITYPE;
    /** HUMANPOSE2D */
    HUMANPOSE2D: FUAITYPE;
    /** GREEN BACKGROUND */
    BACKGROUNDSEGMENTATION_GREEN: FUAITYPE;
    /** FACEPROCESSOR */
    FACEPROCESSOR: FUAITYPE;
    /** HUMAN_PROCESSOR */
    HUMAN_PROCESSOR: FUAITYPE;
    /** FACE_RECOGNIZER */
    FACE_RECOGNIZER: FUAITYPE;
    /** IMAGE_BEAUTY */
    IMAGE_BEAUTY: FUAITYPE;
    /** FACE_ATTRIBUTE_PROCESSOR */
    FACE_ATTRIBUTE_PROCESSOR: FUAITYPE;
    /** FACELANDMARKS75 */
    FACELANDMARKS75: FUAITYPE;
    /** FACELANDMARKS209 */
    FACELANDMARKS209: FUAITYPE;
    /** FACELANDMARKS239 */
    FACELANDMARKS239: FUAITYPE;
    /** FACECAPTURE */
    FACEPROCESSOR_FACECAPTURE: FUAITYPE;
    /** TONGUETRACKING */
    FACEPROCESSOR_FACECAPTURE_TONGUETRACKING: FUAITYPE;
    /** HAIRSEGMENTATION */
    FACEPROCESSOR_HAIRSEGMENTATION: FUAITYPE;
    /** HEADSEGMENTATION */
    FACEPROCESSOR_HEADSEGMENTATION: FUAITYPE;
    /** EXPRESSION */
    FACEPROCESSOR_EXPRESSION_RECOGNIZER: FUAITYPE;
    /** EMOTION_RECOGNIZER */
    FACEPROCESSOR_EMOTION_RECOGNIZER: FUAITYPE;
    /** DISNEYGAN */
    FACEPROCESSOR_DISNEYGAN: FUAITYPE;
    /** FACEID */
    FACEPROCESSOR_FACEID: FUAITYPE;
    /** HUMAN_PROCESSOR_DETECT */
    HUMAN_PROCESSOR_DETECT: FUAITYPE;
    /** HUMAN_PROCESSOR_SEGMENTATION */
    HUMAN_PROCESSOR_SEGMENTATION: FUAITYPE;
    /** HUMAN_PROCESSOR_2D_SELFIE */
    HUMAN_PROCESSOR_2D_SELFIE: FUAITYPE;
    /** HUMAN_PROCESSOR_2D_DANCE */
    HUMAN_PROCESSOR_2D_DANCE: FUAITYPE;
  }
    
  interface FUAIHUMANSEGMODE {
    value: number;

    /** enum values */

    /** CPU_COMMON */
    SEG_CPU_COMMON: FUAIHUMANSEGMODE;
    /** GPU_COMMON */
    SEG_GPU_COMMON: FUAIHUMANSEGMODE;
    /** GPU_MEETING */
    SEG_GPU_MEETING: FUAIHUMANSEGMODE;
  }
    
  interface FUAIFACEMODELCONFIG {
    value: number;

    /** enum values */

    /** DEFAULT */
    FACE_MODEL_ALL_DEFAULT: FUAIFACEMODELCONFIG;
  }
    
  interface FUAIFACEALGORITHMCONFIG {
    value: number;

    /** enum values */

    /** ENABLE_ALL */
    FACE_ALGORITHM_ENABLE_ALL: FUAIFACEALGORITHMCONFIG;
    /** DISABLE_FACE_OCCU */
    FACE_ALGORITHM_DISABLE_FACE_OCCU: FUAIFACEALGORITHMCONFIG;
    /** DISABLE_SKIN_SEG */
    FACE_ALGORITHM_DISABLE_SKIN_SEG: FUAIFACEALGORITHMCONFIG;
    /** DISABLE_DEL_SPOT */
    FACE_ALGORITHM_DISABLE_DEL_SPOT: FUAIFACEALGORITHMCONFIG;
    /** DISABLE_ARMESHV2 */
    FACE_ALGORITHM_DISABLE_ARMESHV2: FUAIFACEALGORITHMCONFIG;
    /** DISABLE_RACE */
    FUAIFACE_DISABLE_RACE: FUAIFACEALGORITHMCONFIG;
    /** DISABLE_LANDMARK_HP_OCCU */
    FUAIFACE_DISABLE_LANDMARK_HP_OCCU: FUAIFACEALGORITHMCONFIG;
  }
    
  interface FUAIMACHINETYPE {
    value: number;

    /** enum values */

    /** LOW */
    LOW: FUAIMACHINETYPE;
    /** HIGH */
    HIGH: FUAIMACHINETYPE;
  }
    
  interface FUAIHUMANMODELCONFIG {
    value: number;

    /** enum values */

    /** CPU_COMMON */
    MODEL_SEG_CPU_COMMON: FUAIHUMANMODELCONFIG;
    /** GPU_COMMON */
    MODEL_SEG_GPU_COMMON: FUAIHUMANMODELCONFIG;
    /** GPU_MEETING */
    MODEL_SEG_GPU_MEETING: FUAIHUMANMODELCONFIG;
  }
    
  interface FUAIHUMANALGORITHMCONFIG {
    value: number;

    /** enum values */

    /** ENABLE_ALL */
    HUMAN_ALGORITHM_ENABLE_ALL: FUAIHUMANALGORITHMCONFIG;
    /** DISABLE_HUMAN_SEG */
    HUMAN_ALGORITHM_DISABLE_HUMAN_SEG: FUAIHUMANALGORITHMCONFIG;
  }
    
  /**
   * @brief Get SDK version string, Major.Minor.Fix_ID
   * @return SDK version string in const char*
   */
  function fuGetVersion(): string;

  /**
   * @brief Set log level
   * @param level - define in FULOGLEVEL enumeration.
   * @return zero for failed, one for success.
   */
  function fuSetLogLevel(
      level: FULOGLEVEL,
  ): number;

  /**
   * @brief init gl context, which managed by SDK
   * @param canvas_id canvas name, can be null.
   * @return non null for success.
   */
  function fuInitGLContext(
      canvas_id: string,
  ): number;

  /**
   * @brief Initialize and authenticate your SDK instance to the FaceUnity server,
   * must be called exactly once before all other functions. The buffers should
   * NEVER be freed while the other functions are still being called. You can call
   * this function multiple times to "switch pointers".
   * @param authdata is the pointer to the authentication data pack we provide. You
   * must avoid storing the data in a file. Normally you can just `#include
   * "authpack.h"` and put `g_auth_package` here.
   * @return non-zero for success, zero for failure
   */
  function fuSetup(
      auth: ArrayBuffer | Uint8Array | Uint16Array | Uint32Array,
  ): number;

  /**
   * @brief set the target plafrom for sdk
   * @param platform - define in FUPLATFORM enumeration.
   * @note this api only worked in webassembly version
   */
  function fuSetPlatform(
      platform: FUPLATFORM,
  ): void;

  /**
   * @brief Create an accessory item from a binary package, you can discard the data
   * after the call.
   * @param data is the pointer to the data
   * @return an integer handle representing the item
   */
  function fuCreateItemFromPackage2(
      data: ArrayBuffer | Uint8Array | Uint16Array | Uint32Array,
  ): number;

  function fuCreateItemFromPackage(data: ArrayBuffer | Uint8Array | Uint16Array | Uint32Array): Promise<number>;
  
  /**
   * @brief Create an accessory item from a binary package, you can discard the data
   * after the call.
   * @param data is the pointer to the data
   * @return an integer handle representing the item
   */
  function fuCreateLiteItemFromPackage(
      handle: number,
      data: ArrayBuffer | Uint8Array | Uint16Array | Uint32Array,
  ): number;

  /**
   * @brief Set the default rotationMode.
   * @param rotationMode is the default rotationMode to be set to, one of 0..3 should
   * work.
   */
  function fuSetDefaultRotationMode(
      rotationMode: number,
  ): void;

  /**
   * @brief Destroy an accessory item. This function no need to be called in the
   * same GLES context / thread as the original fuCreateItemFromPackage.
   * @param item is the handle to be destroyed.
   */
  function fuDestroyItem(
      item: number,
  ): void;

  /**
   * @brief Destroy all accessory items ever created.This function MUST be called in
   * the same GLES context / thread as the original fuCreateItemFromPackage.
   */
  function fuDestroyAllItems(): void;

  /**
   * @brief Destroy all internal data, resources, threads, etc.
   */
  function fuDestroyLibData(): void;

  /**
   * \brief Call this function when the GLES context has been lost and recreated.
   * That isn't a normal thing, so this function could leak resources on
   * each. This function only releses all gl resource compared to fuOnDeviceLost
   * call.
   */
  function fuReleaseGLResources(): void;

  /**
   * \brief Call this function to reset the face tracker on camera switches
   */
  function fuOnCameraChange(): void;

  /**
   * @brief render a webgl rendertexture to canvas which binded to sdk
   * @param texture texture id
   * @param format only RGBA_TEXTURE is supported
   * @param w specifies the image width
   * @param h specifies the image height
   * @param framed_id specifies the current frame id. To get animated effects,
   * please increase frame_id by 1 whenever you call this.
   * @param p_items points to the list of items
   * @param func_flag flags indicate all changable functionalities of render
   * interface
   * @param p_item_masks indicates a list of masks for each item, bitwisely work
   * on certain face
   * @param output_viewport specifies the viewport of the output canvas
   * @return description of the return value
   */
  function fuRenderTextureToCanvas(
      texture: number,
      format: FUFORMAT,
      w: number,
      h: number,
      frame_id: number,
      items: Int32Array,
      func_flag: FURENDERFEATURE,
      p_item_masks: Int32Array,
      output_viewport: CanvasViewport,
  ): void;

  /**
   * @brief render a webgl rendertexture to canvas which binded to sdk
   * @param buffer input buffer
   * @param format buffer format
   * @param w specifies the image width
   * @param h specifies the image height
   * @param framed_id specifies the current frame id. To get animated effects,
   * please increase frame_id by 1 whenever you call this.
   * @param p_items points to the list of items
   * @param func_flag flags indicate all changable functionalities of render
   * interface
   * @param p_item_masks indicates a list of masks for each item, bitwisely work
   * on certain face
   * @param output_viewport specifies the viewport of the output canvas
   * @return description of the return value
   */
  function fuRenderBufferToCanvas(
      buffer: ArrayBuffer | Uint8Array | Uint16Array | Uint32Array,
      buffer_format: FUFORMAT,
      w: number,
      h: number,
      frame_id: number,
      items: Int32Array,
      func_flag: FURENDERFEATURE,
      p_item_masks: Int32Array,
      output_viewport: CanvasViewport,
  ): void;

  /**
   * @brief input description for fuRender api, use to transform the input gpu
   * texture to portrait mode(head-up). then the final output will portrait mode.
   * the outter user present render pass should use identity matrix to present the
   * result.
   * @param tex_trans_mat, the transform matrix use to transform the input
   * texture to portrait mode.
   * @note when your input is cpu buffer only don't use
   * this api, fuSetInputCameraBufferMatrix will handle all case.
   */
  function fuSetInputCameraTextureMatrix(
      matrix: FUTRANSFORM,
  ): void;

  /**
   * @brief input description for fuRender api, use to transform the input cpu
   * buffer to portrait mode(head-up). then the final output will portrait mode. the
   * outter user present render pass should use identity matrix to present the
   * result.
   * @param buf_trans_mat, the transform matrix use to transform the input
   * cpu buffer to portrait mode.
   * @note when your input is gpu texture only don't
   * use this api, fuSetInputCameraTextureMatrix will handle all case.
   */
  function fuSetInputCameraBufferMatrix(
      matrix: FUTRANSFORM,
  ): void;

  /**
   * @brief set input camera texture transform matrix state, turn on or turn off
   */
  function fuSetInputCameraTextureMatrixState(
      isEnable: boolean,
  ): void;

  /**
   * @brief set input camera buffer transform matrix state, turn on or turn off
   */
  function fuSetInputCameraBufferMatrixState(
      isEnable: boolean,
  ): void;

  /**
   * @brief Set an item parameter to a double value
   * @param obj_handle specifies the item
   * @param name is the parameter name
   * @param value is the parameter value to be set
   * @return zero for failure, non-zero for success
   */
  function fuItemSetParamd(
      item: number,
      name: string,
      value: number,
  ): number;

  /**
   * @brief Get an item parameter as a double value
   * @param obj_handle specifies the item
   * @param name is the parameter name
   * @return double value of the parameter
   */
  function fuItemGetParamd(
      item: number,
      name: string,
  ): number;

  /**
   * @brief Set an item parameter to a string value
   * @param item specifies the item
   * @param name is the parameter name
   * @param value is the parameter value to be set
   * @return zero for failure, non-zero for success
   */
  function fuItemSetParams(
      item: number,
      name: string,
      value: string,
  ): number;

  /**
   * @brief Get an item parameter as a string
   * @param item specifies the item
   * @param name is the parameter name
   * @return return the string
   */
  function fuItemGetParams(
      item: number,
      name: string,
  ): string;

  /**
   * @brief Set an item parameter to a double array
   * @param item specifies the item
   * @param name is the parameter name
   * @param value points to an array of doubles
   * @param n specifies the number of elements in value
   * @return zero for failure, non-zero for success
   */
  function fuItemSetParamdv(
      item: number,
      name: string,
      value: Float64Array,
  ): number;

  /**
   * @brief Get an item parameter as a double array
   * @param item specifies the item
   * @param name is the parameter name
   * @return the double array
   */
  function fuItemGetParamdv(
      item: number,
      name: string,
  ): Float64Array;

  /**
   * @brief Get library init status
   * @return 1 inited, 0 not init.
   */
  function fuIsLibraryInit(): boolean;

  /**
   * @brief Load AI model data, to support tongue animation.
   * @param data - the pointer to AI model data 'ai_xxx.bundle',which is along
   * beside lib files in SDK package
   * @param type - define in FUAITYPE enumeration.
   * @return zero for failure, one for success.
   */
  function fuLoadAIModelFromPackage(
      data: ArrayBuffer | Uint8Array | Uint16Array | Uint32Array,
      type: FUAITYPE,
  ): boolean;

  /**
   * @brief Set the maximum number of faces we track. The default value is 1.
   * @param n is the new maximum number of faces to track
   * @return The previous maximum number of faces tracked
   */
  function fuSetMaxFaces(
      max_faces: number,
  ): boolean;

  /**
   * @brief set faceprocessor's face detect mode. when use 1 for video mode, face
   * detect strategy is opimized for no face scenario. In image process scenario,
   * you should set detect mode into 0 image mode.
   * @param mode, 0 for image, 1 for video, 1 by default
   */
  function fuSetFaceProcessorDetectMode(
      mode: number,
  ): void;

  /**
   * @brief Get AI Model load status
   * @param type - define in FUAITYPE enumeration.
   * @return zero for unloaded, one for loaded.
   */
  function fuIsAIModelLoaded(
      type: FUAITYPE,
  ): boolean;

  /**
   * @brief set face processor model config, ref to FUAIFACEMODELCONFIG
   */
  function fuSetFaceModelConfig(
      config: FUAIFACEMODELCONFIG,
  ): void;

  /**
   * @brief set face processor algorithm config, ref to FUAIFACEALGORITHMCONFIG ,
   * use to disable some sub-module while load face ai module, default is -1 which
   * disable all sub-modules.
   */
  function fuSetFaceAlgorithmConfig(
      config: FUAIFACEALGORITHMCONFIG,
  ): void;

  /**
   * @brief set face processor model config, ref to FUAIHUMANMODELCONFIG, config cpu
   * or gpu mode,eth.
   */
  function fuSetHumanModelConfig(
      config: FUAIHUMANMODELCONFIG,
  ): void;

  /**
   * @brief set human processor algorithm config, ref to FUAIHUMANALGORITHMCONFIG ,
   * use to disable some sub-module while load human ai module
   */
  function fuSetHumanAlgorithmConfig(
      config: FUAIHUMANALGORITHMCONFIG,
  ): void;

  /**
   * @brief set ai model FaceProcessor's landmark quality.
   * @param quality, landmark quality, 0 for low quality, 1 for mediem, 2 for high
   * quality. 1 by default.
   */
  function fuFaceProcessorSetFaceLandmarkQuality(
      quality: number,
  ): void;

  /**
   * @brief get ai model FaceProcessor's tracking face count.
   * @return  num of faces.
   */
  function fuFaceProcessorGetNumResults(): number;

  /**
   * @brief Enable Frame time profile
   * @param interval - default is 300.
   * @param detail - report detail
   */
  function fuEnableFrameTimeProfile(
      interval: number,
      detail: boolean,
  ): void;

  /**
   * @brief Disable time profile
   * 
   */
  function fuDisableFrameTimeProfile(): void;

  /**
   * @brief Register a webgl texture to the Nama SDK
   * @param texture is the webgl texture
   * @return an integer handle representing the texture
   */
  function fuRegisterNativeTexture(texture: WebGLTexture): number;

  /**
   * @brief Unregister a native texture
   * @param id is the integer handle representing the texture
   * @return void
   */
  function fuUnRegisterNativeTexture(id: number): void;

 
```