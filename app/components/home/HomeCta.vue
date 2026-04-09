<template>
  <UContainer class="py-24 sm:py-32">
    <div
      class="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#17181B] to-[#101114] px-6 py-20 text-center shadow-2xl sm:px-16"
    >
      <h2
        class="mx-auto mb-10 max-w-2xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
      >
        Ready to meet your true self?
      </h2>
      <UButton
        size="xl"
        color="primary"
        to="/test"
        class="rounded-full px-10 font-bold shadow-[0_0_30px_rgba(159,232,112,0.3)] hover:shadow-[0_0_40px_rgba(159,232,112,0.6)]"
      >
        Start Your Journey
      </UButton>
      <div
        class="bg-primary-400/20 absolute -top-24 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 rounded-full blur-[100px]"
      />
    </div>
  </UContainer>
</template>
