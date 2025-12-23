class PipelineStore:
    def __init__(self):
        self.reset()

    def reset(self):
        self.df = None
        self.X = None
        self.y = None
        self.X_train = None
        self.X_test = None
        self.y_train = None
        self.y_test = None
        self.model = None

pipeline_store = PipelineStore()
