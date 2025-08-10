export default function ShippingPolicy() {
  return (
    <div className="w-full bg-white px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Shipping Policy</h1>
      <div className="max-w-3xl mx-auto space-y-6 text-gray-800">
        <section>
          <h2 className="text-2xl font-semibold">Domestic Shipping</h2>
          <p className="mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque et eros vel lectus tristique hendrerit.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold">International Shipping</h2>
          <p className="mt-2">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold">Order Cancellation</h2>
          <p className="mt-2">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold">Return Shipping</h2>
          <p className="mt-2">
            Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit.
          </p>
        </section>
      </div>
    </div>
  );
}
