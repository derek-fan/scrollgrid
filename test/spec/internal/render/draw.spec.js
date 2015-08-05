define(['d3', 'mock', 'render/draw'], function (d3, mock) {
    "use strict";

    describe("draw", function () {

        var underTest = Scrollgrid.prototype.internal.render.draw,
            render,
            interaction,
            dom,
            physical,
            vals,
            hLeft,
            hMiddle,
            hRight,
            vTop,
            vMiddle,
            vBottom,
            totalWidth,
            totalHeight,
            clearCache;

        beforeEach(function () {
            mock.init();
            d3.init();
            render = mock.internal.render;
            interaction = mock.internal.interaction;
            dom = mock.internal.dom;
            physical = mock.internal.sizes.physical;
            vals = mock.vals;
            clearCache = "Clear Cache";
            hLeft = { left: 0, right: vals.virtLeft };
            hMiddle = { left: vals.virtLeft + vals.viewAreaVirtLeft, right: vals.virtLeft + vals.viewAreaVirtRight };
            hRight = { left: vals.virtOuterWidth - vals.virtRight, right: vals.virtOuterWidth };
            vTop = { top: 0, bottom: vals.virtTop };
            vMiddle = { top: vals.virtTop + vals.viewAreaVirtTop, bottom: vals.virtTop + vals.viewAreaVirtBottom };
            vBottom = { top: vals.virtOuterHeight - vals.virtBottom, bottom: vals.virtOuterHeight };
            totalWidth = physical.left + physical.totalInnerWidth + physical.right + physical.verticalScrollbarWidth;
            totalHeight = physical.top + physical.totalInnerHeight + physical.bottom + physical.horizontalScrollbarHeight;
        });

        it("should call the getVisibleRegion method to get the physical view area", function () {
            underTest.call(mock, clearCache);
            expect(render.getVisibleRegion).toHaveBeenCalled();
        });

        it("should call the getDataBounds method process the visible view area against the data", function () {
            underTest.call(mock, clearCache);
            expect(render.getDataBounds).toHaveBeenCalledWith("visible region");
        });

        it("should call render region for the top left panel", function () {
            underTest.call(mock, clearCache);
            expect(render.renderRegion).toHaveBeenCalledWith(dom.top.left, {}, hLeft, vTop, clearCache);
        });

        it("should call render region for the top middle panel", function () {
            underTest.call(mock, clearCache);
            expect(render.renderRegion).toHaveBeenCalledWith(dom.top, { x: vals.viewAreaPhysX }, hMiddle, vTop, clearCache);
        });

        it("should call render region for the top right panel", function () {
            underTest.call(mock, clearCache);
            expect(render.renderRegion).toHaveBeenCalledWith(dom.top.right, {}, hRight, vTop, clearCache);
        });

        it("should call render region for the middle left panel", function () {
            underTest.call(mock, clearCache);
            expect(render.renderRegion).toHaveBeenCalledWith(dom.left, { y: vals.viewAreaPhysY }, hLeft, vMiddle, clearCache);
        });

        it("should call render region for the center panel", function () {
            underTest.call(mock, clearCache);
            expect(render.renderRegion).toHaveBeenCalledWith(dom.main, { x: vals.viewAreaPhysX, y: vals.viewAreaPhysY }, hMiddle, vMiddle, clearCache);
        });

        it("should call render region for the middle right panel", function () {
            underTest.call(mock, clearCache);
            expect(render.renderRegion).toHaveBeenCalledWith(dom.right, { y: vals.viewAreaPhysY }, hRight, vMiddle, clearCache);
        });

        it("should call render region for the bottom left panel", function () {
            underTest.call(mock, clearCache);
            expect(render.renderRegion).toHaveBeenCalledWith(dom.bottom.left, {}, hLeft, vBottom, clearCache);
        });

        it("should call render region for the bottom middle panel", function () {
            underTest.call(mock, clearCache);
            expect(render.renderRegion).toHaveBeenCalledWith(dom.bottom, { x: vals.viewAreaPhysX }, hMiddle, vBottom, clearCache);
        });

        it("should call render region for the bottom right panel", function () {
            underTest.call(mock, clearCache);
            expect(render.renderRegion).toHaveBeenCalledWith(dom.bottom.right, {}, hRight, vBottom, clearCache);
        });

        it("should call add resize handles for the top left panel", function () {
            underTest.call(mock, clearCache);
            expect(interaction.addResizeHandles).toHaveBeenCalledWith(dom.top.left, hLeft);
        });

        it("should call add resize handles for the top middle panel", function () {
            underTest.call(mock, clearCache);
            expect(interaction.addResizeHandles).toHaveBeenCalledWith(dom.top, hMiddle, vals.viewAreaPhysX);
        });

        it("should call add resize handles for the top right panel", function () {
            underTest.call(mock, clearCache);
            expect(interaction.addResizeHandles).toHaveBeenCalledWith(dom.top.right, hRight);
        });

        it("should call layoutDOM with a null fixed width if the grid is smaller than the total width", function () {
            dom.parent.nodeObject.offsetWidth = totalWidth - 1;
            underTest.call(mock, clearCache);
            expect(dom.layoutDOM.mostRecentCall.args[0].width).toBeNull();
        });

        it("should call layoutDOM with a null fixed width if the grid width is equal to the total width", function () {
            dom.parent.nodeObject.offsetWidth = totalWidth;
            underTest.call(mock, clearCache);
            expect(dom.layoutDOM.mostRecentCall.args[0].width).toBeNull();
        });

        it("should call layoutDOM with a fixed width if the grid is larger than the total width", function () {
            dom.parent.nodeObject.offsetWidth = totalWidth + 1;
            underTest.call(mock, clearCache);
            expect(dom.layoutDOM.mostRecentCall.args[0].width).toEqual(totalWidth);
        });

        it("should call layoutDOM with a null fixed height if the grid is smaller than the total height", function () {
            dom.parent.nodeObject.offsetHeight = totalHeight - 1;
            underTest.call(mock, clearCache);
            expect(dom.layoutDOM.mostRecentCall.args[0].height).toBeNull();
        });

        it("should call layoutDOM with a null fixed height if the grid height is equal to the total height", function () {
            dom.parent.nodeObject.offsetHeight = totalHeight;
            underTest.call(mock, clearCache);
            expect(dom.layoutDOM.mostRecentCall.args[0].height).toBeNull();
        });

        it("should call layoutDOM with a fixed height if the grid is larger than the total height", function () {
            dom.parent.nodeObject.offsetHeight = totalHeight + 1;
            underTest.call(mock, clearCache);
            expect(dom.layoutDOM.mostRecentCall.args[0].height).toEqual(totalHeight);
        });

    });

});