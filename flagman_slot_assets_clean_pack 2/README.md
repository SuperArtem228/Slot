# Flagman slot asset pack

This pack contains cleaned and renamed PNG assets for the current rescue-slot prototype.

## Files
- reference_rescue_slot_concept.png — full-screen concept reference
- slot_frame_idle.png — base slot shell
- slot_frame_active.png — charged / glow slot shell
- slot_row_highlight_overlay.png — horizontal active-row glow overlay
- cta_button_primary_green.png — main CTA button shell
- symbol_crown_emerald.png — high-value crown symbol
- symbol_bonus_orb_emerald.png — gem / bonus orb symbol
- symbol_treasure_chest_emerald.png — chest symbol
- symbol_gift_box_violet.png — gift box symbol
- symbol_trophy_silver_blue.png — trophy symbol
- symbol_vip_badge_emerald.png — VIP badge symbol

## Recommended mapping into current prototype
- crown -> symbol_crown_emerald.png
- 500FS -> symbol_bonus_orb_emerald.png or keep temporary text badge until dedicated FS symbol is made
- pig -> symbol_vip_badge_emerald.png
- bonus -> symbol_bonus_orb_emerald.png
- cup -> symbol_trophy_silver_blue.png
- tickets -> symbol_gift_box_violet.png
- chest -> symbol_treasure_chest_emerald.png

## Notes
- Text labels under symbols should be removed in the UI.
- The current big blur circle and starburst hit effect should be replaced by slot_row_highlight_overlay.png plus soft glow / shine animation.
- slot_frame_active.png should be used for charged / near-miss / hit states, not constantly.
