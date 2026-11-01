/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function getPhilosopherPortrait(id: string): string {
  return `${import.meta.env.base_url}portraits/${id}.jpg`;
}
