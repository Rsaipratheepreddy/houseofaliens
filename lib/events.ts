/**
 * Type-safe browser CustomEvent helpers used by the UFO choreography.
 *
 * The cart context dispatches `hoa:add-to-cart` whenever a product is added,
 * carrying the DOM rect of the click source plus a product image URL. The
 * <UfoCompanion /> mounted in the root layout listens for this and runs
 * the alien-grab sequence.
 */

export interface AddToCartDetail {
  /** Bounding rect of the clicked control (e.g. PDP add-to-cart button). */
  sourceRect: { left: number; top: number; width: number; height: number };
  /** Bounding rect of the visible product image, used as the "grab" target. */
  imageRect?: { left: number; top: number; width: number; height: number };
  /** Image URL for the ghost clone that the alien hauls up to the saucer. */
  productImage: string;
  /** Display name (used for accessibility / analytics hooks). */
  productName: string;
}

export const ADD_TO_CART_EVENT = 'hoa:add-to-cart';

/** Fires once after the UFO completes its intro flight and parks. The Hero
 *  listens for this and runs a brief impact-shake on the headline. */
export const UFO_LANDED_EVENT = 'hoa:ufo-landed';

export function dispatchAddToCart(detail: AddToCartDetail) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent<AddToCartDetail>(ADD_TO_CART_EVENT, { detail }));
}

export function dispatchUfoLanded() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(UFO_LANDED_EVENT));
}

/** Helper: read the bounding rect of a DOM element as a serializable object. */
export function rectFromEl(el: Element | null | undefined): AddToCartDetail['sourceRect'] | undefined {
  if (!el) return undefined;
  const r = el.getBoundingClientRect();
  return { left: r.left, top: r.top, width: r.width, height: r.height };
}
