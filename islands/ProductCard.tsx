import { useEffect, useState } from "preact/hooks";
import { Products } from "../database/Product/schema.ts";
import { showFile } from "../utils/file.ts";

export default function ProductCard({ data }: any) {
  const [inViewport, setInViewport] = useState(false);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInViewport(true);
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    const imageRefs = Array.from(document.querySelectorAll(".lazy-image"));
    imageRefs.forEach((imgRef) => {
      observer.observe(imgRef);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleScroll = () => {
    const imageRefs = Array.from(document.querySelectorAll(".lazy-image"));
    imageRefs.forEach((imgRef) => {
      const rect = imgRef.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        setInViewport(true);
        imageRefs.splice(imageRefs.indexOf(imgRef), 1);
      }
    });
  };

  useEffect(() => {
    self.addEventListener("scroll", handleScroll);
    return () => {
      self.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div class="flex flex-wrap gap-8 justify-center container mx-auto">
        {data && data.map((product: Products, index: number) => {
          return (
            <>
              <div
                key={index}
                className="w-full max-h-[550px] max-w-[250px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <a href="#" class="flex justify-center">
                  {inViewport
                    ? (
                      <img
                        className={`p-8 rounded-[2.5rem] object-cover h-[250px] items-center relative ${
                          inViewport ? "" : "lazy-image"
                        }`}
                        src={showFile(product.image)}
                        alt="product-image"
                      />
                    )
                    : (
                      <div
                        className={`p-8 flex items-center justify-center h-[250px] w-[250px] relative ${
                          inViewport ? "" : "lazy-image"
                        }`}
                      >
                        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div class="animate-spin rounded-full border-t-4 border-blue-500 border-solid h-12 w-12">
                          </div>
                        </div>
                      </div>
                    )}
                </a>
                <div className="px-5 pb-5">
                  <a href="#">
                    <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                      {product.title}
                    </h5>
                  </a>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      $599
                    </span>
                    <a
                      href={`/${product._id}`}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Add to Cart
                    </a>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
