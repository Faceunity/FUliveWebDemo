Funamawebassembly 库是对CNamaSDK的再封装，接口声明在funamawebassembly.d.ts当中
```typescript
 /**
   * @brief CanvasViewport
   * @note 调用 CanvasViewport.delete 释放内存
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
  
  
   /**
   * @brief 平台枚举值
   * 
   */
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
  
   /**
   * @brief LOG等级枚举值
   * 
   */
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
  
  /**
   * @brief 渲染功能枚举值
   * 
   */
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
  
  /**
   * @brief 格式枚举值
   * 
   */
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
  
  /**
   * @brief 旋转枚举值，用于fuSetInputCameraXXXXMatrix输入
   * 
   */
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
  
  /**
   * @brief AI能力枚举值
   * 
   */
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
  
  /**
   * @brief 人体分割模式
   * 
   */
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
  /**
   * @brief 人脸算法配置枚举值
   * 
   */
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
  
  /**
   * @brief 人体模型配置
   * 
   */
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
  /**
   * @brief 人体ai算法能力配置
   * 
   */
  interface FUAIHUMANALGORITHMCONFIG {
    value: number;

    /** enum values */

    /** ENABLE_ALL */
    HUMAN_ALGORITHM_ENABLE_ALL: FUAIHUMANALGORITHMCONFIG;
    /** DISABLE_HUMAN_SEG */
    HUMAN_ALGORITHM_DISABLE_HUMAN_SEG: FUAIHUMANALGORITHMCONFIG;
  }
    
  /**
   * @brief 获取SDK版本号
   * @return SDK版本号
   */
  function fuGetVersion(): string;

  /**
   * @brief 设置SDK Log等级
   * @param level - LOG等级
     * @return 0为失败，1为成功
   */
  function fuSetLogLevel(
      level: FULOGLEVEL,
  ): number;

  /**
   * @brief 初始化SDK Opengl上下文
   * @param canvas的id
   * @return 返回Context 句柄,0为失败
   */
  function fuInitGLContext(
      canvas_id: string,
  ): number;

  /**
   * @brief 初始化系统环境，加载系统数据，并进行网络鉴权。必须在调用SDK其他接口前执行，否则会引发崩溃。
   * @param 鉴权证书
   * @return返回非0值代表成功，返回0代表失败。如初始化失败
   */
  function fuSetup(
      auth: ArrayBuffer | Uint8Array | Uint16Array | Uint32Array,
  ): number;

  /**
   * @brief 设置目标平台
   * @param platform - 平台枚举值
   * @note web平台特有的api
   */
  function fuSetPlatform(
      platform: FUPLATFORM,
  ): void;

  /**
   * @brief 加载道具包，使其可以在主运行接口中被执行。一个道具包可能是一个功能模块或者多个功能模块的集合，加载道具包可以在流水线中激活对应的功能模块
   * @param 道具bundle数据
   * @return 道具句柄
   */
  function fuCreateItemFromPackage2(
      data: ArrayBuffer | Uint8Array | Uint16Array | Uint32Array,
  ): number;
    /**
   * @brief 异步加载道具包
   * @return 道具句柄的promise
   */
  function fuCreateItemFromPackage(data: ArrayBuffer | Uint8Array | Uint16Array | Uint32Array): Promise<number>;
  
  function fuCreateLiteItemFromPackage(
      handle: number,
      data: ArrayBuffer | Uint8Array | Uint16Array | Uint32Array,
  ): number;

  /**
   * @brief 设置默认的人脸朝向。
   * @param 要设置的人脸朝向，取值范围为 0-3，分别对应人脸相对于图像数据旋转0度、90度、180度、270度。
   */
  function fuSetDefaultRotationMode(
      rotationMode: number,
  ): void;

  /**
   * @brief销毁一个指定道具。
   * @param 道具句柄
   */
  function fuDestroyItem(
      item: number,
  ): void;

  /**
   * @brief 销毁所有道具
   */
  function fuDestroyAllItems(): void;

  /**
   * @brief 销毁SDK所有数据
   */
  function fuDestroyLibData(): void;

  /**
   * \brief 清除gl资源
   */
  function fuReleaseGLResources(): void;

  /**
   * \brief 清除人脸检测器的缓存
   */
  function fuOnCameraChange(): void;

  /**
   * @brief 将输入纹理渲染到canvas上
   * @param texture 输入纹理id(通过fuRegisterNativeTexture将webgl纹理注册到sdk内部)
   * @param format 纹理内容格式，目前只支持RGBA_TEXTURE
   * @param w 宽度
   * @param h 高度
   * @param framed_id 帧id.
   * @param p_items 道具列表
   * @param func_flag 渲染功能flag
   * @param p_item_masks 道具掩码，表示在多人模式下，每个道具具体对哪几个人脸生效。该数组长度应和 p_items 一致，每个道具一个int类型掩码。掩码中，从int低位到高位，第i位值为1代表该道具对第i个人脸生效，值为0代表不生效。
   * @param output_viewport 指定canvas的viewport
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
   * @brief 将输入 图像渲染到canvas上
   * @param buffer 输入图像buffer
   * @param format 纹理内容格式，目前只支持RGBA_TEXTURE
   * @param w 宽度
   * @param h 高度
   * @param framed_id 帧id.
   * @param p_items 道具列表
   * @param func_flag 渲染功能flag
   * @param p_item_masks 道具掩码，表示在多人模式下，每个道具具体对哪几个人脸生效。该数组长度应和 p_items 一致，每个道具一个int类型掩码。掩码中，从int低位到高位，第i位值为1代表该道具对第i个人脸生效，值为0代表不生效。
   * @param output_viewport 指定canvas的viewport
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
   * @brief 定义输入纹理转换矩阵，输入包含纹理时，可用于旋转输入纹理
   * @param tex_trans_mat, 旋转类别，参见TRANSFORM_MATRIX定义。
   */
  function fuSetInputCameraTextureMatrix(
      matrix: FUTRANSFORM,
  ): void;

  /**
   * @brief 定义输入buffer矩阵，输入包含buffer时，可用于旋转输入buffer
   * @param tex_trans_mat, 旋转类别，参见TRANSFORM_MATRIX定义。
   */
  function fuSetInputCameraBufferMatrix(
      matrix: FUTRANSFORM,
  ): void;

  /**
   * @brief 设置由`fuSetInputCameraTextureMatrix`设置的TransformMatrix是否生效。
   */
  function fuSetInputCameraTextureMatrixState(
      isEnable: boolean,
  ): void;

  /**
   * @brief 设置由`fuSetInputCameraBufferMatrixState`设置的TransformMatrix是否生效。
   */
  function fuSetInputCameraBufferMatrixState(
      isEnable: boolean,
  ): void;

  /**
   * @brief 修改或设定道具包中变量的值。可以支持的道具包变量名、含义、及取值范围需要参考道具的文档
   */
  function fuItemSetParamd(
      item: number,
      name: string,
      value: number,
  ): number;

  function fuItemGetParamd(
      item: number,
      name: string,
  ): number;

  function fuItemSetParams(
      item: number,
      name: string,
      value: string,
  ): number;

  function fuItemGetParams(
      item: number,
      name: string,
  ): string;

  function fuItemSetParamdv(
      item: number,
      name: string,
      value: Float64Array,
  ): number;

  function fuItemGetParamdv(
      item: number,
      name: string,
  ): Float64Array;

  /**
   * @brief 查询sdk是否以及初始化
   * @return 1表示已初始化，0表示未初始化
   */
  function fuIsLibraryInit(): boolean;

  /**
   * @brief 在fuSetup后，可以预先加载未来可能需要使用到的AI能力。
   * @param data - ai bundle数据
   * @param type - ai 能力类型
   * @return 0为失败，1为成功
   */
  function fuLoadAIModelFromPackage(
      data: ArrayBuffer | Uint8Array | Uint16Array | Uint32Array,
      type: FUAITYPE,
  ): boolean;

  /**
   * @brief 设置最大人脸数，默认值为1
   */
  function fuSetMaxFaces(
      max_faces: number,
  ): boolean;

  /**
   * @brief 设置人脸检测模式
   * @param mode, 0表示图片模式, 1表示视频模式，默认值为1
   */
  function fuSetFaceProcessorDetectMode(
      mode: number,
  ): void;

  /**
   * @brief 获取ai模型是否被加载
   * @param type - 需要查询的ai类型
   * @return 0表示未加载，1表示已经加载
   */
  function fuIsAIModelLoaded(
      type: FUAITYPE,
  ): boolean;

  /**
   * @brief 设置人脸模型加载配置，参考 FUAIFACEMODELCONFIG
   */
  function fuSetFaceModelConfig(
      config: FUAIFACEMODELCONFIG,
  ): void;

  /**
   * @brief 设置人脸算法加载配置，参考FUAIFACEALGORITHMCONFIG
   */
  function fuSetFaceAlgorithmConfig(
      config: FUAIFACEALGORITHMCONFIG,
  ): void;

  /**
   * @brief 设置人体模型加载配置，参考FUAIHUMANMODELCONFIG
   */
  function fuSetHumanModelConfig(
      config: FUAIHUMANMODELCONFIG,
  ): void;

  /**
   * @brief 设置人体算法加载配置，参考FUAIHUMANALGORITHMCONFIG
   */
  function fuSetHumanAlgorithmConfig(
      config: FUAIHUMANALGORITHMCONFIG,
  ): void;

  /**
   * @brief 设置人脸点位质量.
   * @param 质量，0表示低质量，1表示中等，2表示高质量
   */
  function fuFaceProcessorSetFaceLandmarkQuality(
      quality: number,
  ): void;

  /**
   * @brief 获取人脸识别数量
   * @return  人脸的数量
   */
  function fuFaceProcessorGetNumResults(): number;

  /**
   * @brief 启动TimeProfile
   * @param interval - default is 300.
   * @param detail - 是否汇报细节
   */
  function fuEnableFrameTimeProfile(
      interval: number,
      detail: boolean,
  ): void;

  /**
   * @brief 关闭TimeProfile
   * 
   */
  function fuDisableFrameTimeProfile(): void;
    
    
     /**
   * @brief 注册WebglTexture到sdk中，供sdk使用
   * @param webglTexture
   * @return 注册的句柄
   */
  function fuRegisterNativeTexture(texture: WebGLTexture): number;

  /**
   * @brief 取消注册纹理
   * @param 已注册的句柄
   * @return void
   */
  function fuUnRegisterNativeTexture(id: number): void;


  
```