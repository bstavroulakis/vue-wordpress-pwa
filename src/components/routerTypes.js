const CategoryComponent = resolve => {
    require.ensure(['../theme/Category.vue'], () => {
      resolve(require('../theme/Category.vue'))
    })
}

const PageComponent = resolve => {
    require.ensure(['../theme/Page.vue'], () => {
      resolve(require('../theme/Page.vue'))
    })
}

const SingleComponent = resolve => {
    require.ensure(['../theme/Single.vue'], () => {
      resolve(require('../theme/Single.vue'))
    })
}

const CategoryLearningPathsComponent = resolve => {
    require.ensure(['../theme/Category-LearningPaths.vue'], () => {
      resolve(require('../theme/Category-LearningPaths.vue'))
    })
}

const SingleLearningPathsComponent = resolve => {
    require.ensure(['../theme/Single-LearningPaths.vue'], () => {
      resolve(require('../theme/Single-LearningPaths.vue'))
    })
}

const NotFoundComponent = resolve => {
    require.ensure(['../theme/404.vue'], () => {
      resolve(require('../theme/404.vue'))
    })
}
const CategoryNewsletterComponent = resolve => {
    require.ensure(['../theme/Category-Newsletter.vue'], () => {
      resolve(require('../theme/Category-Newsletter.vue'))
    })
}


export {
  CategoryComponent,
  SingleComponent,
  SingleLearningPathsComponent,
  CategoryLearningPathsComponent,
  NotFoundComponent,
  PageComponent,
  CategoryNewsletterComponent
}